# autoketing-help-center

> Extensions for Autoketing

## Install

```bash
yarn add autoketing-extensions
```

## Usage

```jsx
import React, { Component } from 'react'

import { HelpCenter, InputColorPicker, InputColorPickerRound } from 'autoketing-extensions'

class Example extends Component {

  state = {
    colorBgHex: ""
  };

  handleChangeBgColor = (value, name) => {
    this.setState({ colorBgHex: value });
    console.log(value);
    console.log(name);
  };
  render () {
    return (
      <HelpCenter
        document="https://freshdesk.com"
        video="https://www.youtube.com/embed/Wb5-XH2pkSw?rel=0&autoplay=1"
        shop={shopUrl}
        groupID={42000096826}
      />
      <InputColorPicker
        value={this.state.colorBgHex}
        label="Background Color"
        name="bgColor"
        onChange={this.handleChangeBgColor}
      />
      <InputColorPickerRound
        value={this.state.colorBgHex}
        label="Background Color"
        name="bgColor"
        onChange={this.handleChangeBgColor}
      />
    )
  }
}
```

## Properties

#### HelpCenter Component

| Name     | Type   | Required | Example                                   | Description             |
| -------- | ------ | -------- | ----------------------------------------- | ----------------------- |
| document | string | yes      | https://google.com                        | Link document for App   |
| video    | string | no       | https://www.youtube.com/embed/bM7QcJW68fg | Link video for App      |
| shop     | string | yes      | shopUrl                                   | Get shop email and name |
| groupID  | number | no       | 42000096826                               | GroupID for Freshdesk   |

- GroupID:
  - 42000096826 Facebook Chat Box
  - 42000051885 Product Management
  - 42000051886 QA
  - 42000051887 Sales

#### InputColorPicker Component

| Name     | Type   | Required | Example                                   | Description             |
| -------- | ------ | -------- | ----------------------------------------- | ----------------------- |
| label    | string | yes      | Background Color                     | Text Title   |
| placeholder    | string | no       | Choose background color | placeholder for input color      |
| colors     | array | no      | ["#B80000", "#DB3E00"]  | list color  |
| value  | string | yes       | #F00                               | color code default   |
| name  | string | yes       | bgColor                               | key component   |
| onChange  | function | yes       |    | callback - return after choose color   |

#### InputColorPickerRound Component

| Name       | Type     | Required | Example                   | Description                         |
| -----------| ---------| -------- | ------------------------- | ----------------------------------- |
| label      | string   | yes      | Background Color          | Text Title                          |
| placeholder| string   | no       | Choose background color   | placeholder for input color         |
| colors     | array    | no       | ["#B80000", "#DB3E00"]    | list color                          |
| value      | string   | yes      | #F00                      | color code default                  |
| name       | string   | yes      | bgColor                   | key component                       |
| onChange   | function | yes      |                           | callback - return after choose color|
| except     | string   | yes      | '#ffffff'                 | except white                        |

## How to Setup

- Download file `js.zip` <a href="https://raw.githubusercontent.com/autoketing/autoketing-help-center/master/download/js.zip">here</a>
- Extract and add folder `js` in folder `public`
- Edit file `index.html` in folder `public`
  - add `<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons'>` in tag `head`
  - add script before the tag `</body>`

```bash
  <script src="/js/drift.js"></script>
  <script src="/js/jquery-3.3.1.min.js"></script>
  <script src="/js/custom-materialize.min.js"></script>
```

## License

MIT © 2018 by [Autoketing](https://github.com/autoketing)
