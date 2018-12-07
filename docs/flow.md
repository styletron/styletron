# Flow

## Required annotations for generics when exporting components

As of Flow 0.85, generics are no longer inferred across module boundaries. Because Styletron relies on generics, exported styled components must have these annotations.

```diff
type FooProps = {$foo: string};
- export const Foo = styled("div", ({$foo}: FooProps) => ({color: $foo}));
+ export const Foo = styled<FooProps>("div", (props: FooProps) => ({color: $foo}));

type BarProps = {$bar: string};
- export const Bar = withStyle(Foo, (props: BarProps) => ({background: $bar}));
+ export const Bar = withStyle<typeof Foo, BarProps>(Foo, ({$bar}: BarProps) => ({background: $bar}));
```

Components defined and used within a single file do not need annotations.
