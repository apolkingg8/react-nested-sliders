# React nested sliders (WIP)

## Demo
Check online [storybook](https://apolkingg8.github.io/react-nested-sliders/)

Or run in local:
```
yarn install
yarn storybook
```

## Design

### Requirements
- [x] Should have Fold/Unfold when click on the right-rectangle at the left side of the track name
- [x] Should be able to drag the transition bar, left transition handler and right transition handler to change delay and duration.
- [x] When dragging the transition bar, it should change delay only.
- [x] When dragging the left transition handler, it should change delay and duration.
- [x] When dragging the right transition handler, it should change duration only.
- [x] When changing delay and duration, you should also update other tracks which are related to the selected one.
- [x] If transition bars are too long, you need to have scroll for it. But the track name panel should be fixed.
- [x] When a track is selected/hovered, we should highlight both `Track Name` block and `Transition Bar` block. (The whole row)

### Can be better
- [x] Better slider style
- [x] Cleanup onChange logic
- [ ] Bar scroll should be grouped
- [ ] Add more tests for helper
- [ ] Handle unexpected error  
- [x] Storybook CI/CD with github action

## Development

### Scripts
* `yarn test`: Run tests with `jest`.
* `yarn build`: Compile `ts` files to `js`.
* `yarn storybook`: Launch local `storybook` for development.
* `yarn deploy-storybook`: Deploy `storybook` to GitHub page.

### How to use
Check stories for [Slider](src/Slider.stories.tsx) and [NestedSlider](src/NestedSlider.stories.tsx) usage.

### CI/CD
With GitHub action, trigger when push on master. [Config here](.github/workflows/main.yaml).

## License
MIT.