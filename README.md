# React nested sliders 
(Phase challenge #2)

## Demo
```
yarn install
yarn storybook
```

## Requirements
- [x] Should have Fold/Unfold when click on the right-rectangle at the left side of the track name
- [x] Should be able to drag the transition bar, left transition handler and right transition handler to change delay and duration.
- [x] When dragging the transition bar, it should change delay only.
- [x] When dragging the left transition handler, it should change delay and duration.
- [x] When dragging the right transition handler, it should change duration only.
- [x] When changing delay and duration, you should also update other tracks which are related to the selected one.
- [x] If transition bars are too long, you need to have scroll for it. But the track name panel should be fixed.
- [x] When a track is selected/hovered, we should highlight both `Track Name` block and `Transition Bar` block. (The whole row)

## Can be better
- [ ] Cleanup onChange logic
- [ ] Bar scroll should be grouped
- [ ] Add tests
- [ ] Storybook CI/CD with github action