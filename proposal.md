## Abstract

Over the past 2 years working on https://github.com/ramda/types/ and general usage of `ramda` at my job, I've learned a lot about the challenges of typing javascript function, performance, and debugging `ramda`

From this experience, I have collected a few ideas that I would like to propose to help solve these issues

## Challenges in typing

For 80% of functions, typing is easy. LIke most things, this is the 80/20 rule. The outliers take up most of the time.

The first of those outliers are functions that overload arrays, objects, or "dispatches to <method>". There difficulties is knows which type is passed throughout the currying.

Let's look at `filter()` as an example

```typescript
export function filter<A, P extends A>(
  pred: (val: A) => val is P,
): {
  // if we put `Record<string, A>` first, it will actually pic up `A[]` as well
  // so it needs to go first
  <B extends A>(list: readonly B[]): P[];
  <B extends A>(dict: Record<string, B>): Record<string, P>;
  // but we also want `A[]` to be the default when doing `pipe(filter(fn))`, so it also needs to be last
  <B extends A>(list: readonly B[]): P[];
};
```
Typescript needs the "most specific" to come first, and "most generic" to come last. It tries to match, in that order, which overload it should use. The problem here is that _technically_ a javascript array is a `Record<string, P>`, so we have to repeat `  <B extends A>(list: readonly B[]): P[];` both at the top and the bottom

Another big issue is very esoteric. It turns out that when typescript passes a function to another function as an argument, typescript has to select one of the overloads, and it always selects the bottom "most generic" one. This causes 2 things:
* You cannot use the `dict` overload without extra steps
* The generic collapses to `unknown` (I go into details on this one [here](https://github.com/ramda/types/discussions/54))

On top of this, it's impossible to type them as transducers because you cannot dynamically type something based on what you pass it too

In the land of typescript, it's very rare that you wouldn't know the type you working on. While you won't always know `T`, you'd know if it's `T[]` or `Record<string, T>` or an instance with a `.filter()` method. Having separate functions for those would allow each to be specifically typed for that use-case

```typescript
export type Filterable<A> = {
  filter<P extends A>(fn: (a: A) => A is P): Filterable<P>;
};

export function filterF<A, P extends A>(
  pred: (val: A) => val is P,
): {
  <B extends A>(filterable: Filterable<B>): Filterable<P>;
};

export function filterO<A, P extends A>(
  pred: (val: A) => val is P,
): {
  <B extends A>(dict: Record<string, B>): Record<string, P>;
};

export function filter<A, P extends A>(
  pred: (val: A) => val is P,
): {
  <B extends A>(list: readonly B[]): P[];
};
```

Additionally, the type for `filter` when used as a transformer would be typed like this
```typescript
export function xFilterO<A, P extends A>(
  pred: (val: A) => val is P,
): {
 (xf: Transformer): Transformer;
}

export function xFilter<>() {}
```

I would like to propose that `ramda` exposes these individual functions from a new export path `ramda/discrete`

```typescript
import { filter, filterO, filterF, xFilter } from 'ramda/discrete';
```

Please see this Draft MR for an example of how this would be implemented

`ramda/discrete` is simply an additional set of functions that are more discretely defined in their purpose and arguments than their general counterparts exported from `ramda`

Those implementation can also be composed into the general functions.

## Performance issues

At my company I work at I have had mixed success selling ramda, as a whole or as an alternative to lodash.

I'll write in another post about the successes, because I believe this audience will very much appreciate it, but for the sake of brevity I'll stick to main push back: performance.

We have some NodeJS backends where performance is key (why not Go or Elixir? story for another day) and while I don't personally by into Brenchmark testing ops/sec ([jsperf](https://jsperf.app/)), [JSBench](https://jsbench.me/), etc), it's been a point of contention

The problem isn't that ramda's algorithms are slow, quick the contrary. The problem is the logic around `_dispatchable`, `_curry`, and function overloads. The solution for the function overloads is covered by `ramda/discrete` above. The other 2 are different. What it comes down too is those extra clock cycles calling.

So I'd like to propose exposing those as well. `ramda/uncurried` was the name I was thinking of, and `ramda/discrete/uncurried`.

Both are simply all the functions prior to being wrapped in `_curry`. the abstraction for this is quite easy, it's just a matter of code organization and composition. Nothing would really change, we'd just be giving access to the underlying computations for those user interested in them.

Everything else from ramda would still be as is. Completely backwards compatible

### `package.json` and UMD builds

TODO
