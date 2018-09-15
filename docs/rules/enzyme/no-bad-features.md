# Disallows a group of Enzyme features that lead to bad practices. (enzyme/no-bad-features)

This rule restricts usuage of the [Enzyme testing utility](https://airbnb.io/enzyme) by preventing a specific set of features that, more often than not, lead to bad testing practices. 

## Rule Details

The disallowed features are grouped into "immutability" and "component-boundaries" as follows:

#### `immutability`
- `setState`
- `setContext`
- `simulate`
- `simulateError`

#### `component-boundaries`
- `instance`
- `state`
- `ref`

You can learn more about each of these features on the [Enzyme documentation](https://airbnb.io/enzyme).

Examples of **incorrect** code for the `immutability` group of features:

```ts
const wrapper = mount(<Foo />);
wrapper.setState({foo: 'bar'});
wrapper.setContext({bar: 'baz'});
wrapper.simulate('click');
wrapper.simulateError(new Error('Explosions!'));
```

Examples of **incorrect** code for the `component-boundaries` group of features:

```ts
const wrapper = shallow(<Foo />);
const instance = wrapper.instance();
const someState = wrapper.state('someStateKey');
const someRef = wrapper.ref('someRefAttribute');
```

### `allow`

```json
{
  "enzyme/no-bad-features": [
    "error",
    {
      "allow": ["immutability", "instance"]
    }
  ]
}
```

This option takes an array of whitelisted features or groups of features that configures the rule to not report their usage. There are nine possible values for this option.

- `"immutability"`
- `"component-boundaries"`
- `"setState"`:
- `"setContext"`
- `"simulate"`
- `"simulateError"`
- `"instance"`
- `"state"`
- `"ref"`


By default, none of these options are enabled (the equivalent of `{ "allow": [] }`).

## When Not To Use It

If you do not wish to restrict Enzyme features, you can safely disable this rule.
