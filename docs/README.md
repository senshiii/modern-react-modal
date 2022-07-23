# Modern React Modal

A lightweight and customisable Modal component for modern React apps

## Installation

Using `npm`

```
npm install modern-react-modal
```

Using `yarn`

```
yarn add modern-react-modal
```

## Usage

```js
import { Modal, ModalBody, ModalHeader, ModalFooter } from "modern-react-modal";
import { useState } from "react";

const MyComponent = (props) => {
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <button onClick={() => setShow(true)}>Subscribe to Newsletter</button>
      <Modal show={show} onClose={onClose}>
        <ModalHeader>
          <h2>Subscribe To Newsletter</h2>
        </ModalHeader>
        <ModalBody>
          <p>Enter email in which you want to receive updates</p>
          <input placeholder="Enter email" />
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose}>Close</button>
          <button>Subscribe</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
```

## Props

### Modal

|Prop|Description|Value|Required|
|-|-|-|-|
|show|Determines whether to show the modal|`boolean`|Yes
|onClose|Function called when modal is closed|`Function`|Yes
|size|Determines size of modal|`sm` or `md` or `lg` or `xl` or `fullscreen`|No
|clickOverlayToClose|If true,the modal closes when overlay is clicked|`boolean`|No
|blurOverlay|If true, blur filter is applied to overlay|`boolean`|No
|scrollContent|If true, then modal maintains a fixed height in case of content overflow. The modal body becomes scrollable. If false, then modal assumes entire height of content and the overlay is scrollable|`boolean`|No
|effect|Determines the entry effect of the modal|`fade` or `slide`|No

### ModalHeader

|Prop|Description|Value|Required|
|-|-|-|-|
className|Custom classname applied to the header component|`string`|No

### ModalBody

|Prop|Description|Value|Required|
|-|-|-|-|
className|Custom classname applied to the body component|`string`|No

### ModalFooter

|Prop|Description|Value|Required|
|-|-|-|-|
className|Custom classname applied to the footer component|`string`|No
