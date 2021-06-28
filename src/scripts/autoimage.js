/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import {
  Plugin,
} from 'ckeditor5/src/core';
// import {
//   Clipboard,
// } from 'ckeditor5/src/clipboard';
import {
  LivePosition,
  LiveRange,
} from 'ckeditor5/src/engine';
// import {
//   Undo,
// } from 'ckeditor5/src/undo';
import {
  global,
} from 'ckeditor5/src/utils';

function insertImage(model, attributes = {}, insertPosition = null) {
  model.change((writer) => {
    const imageElement = writer.createElement('image', attributes);

    const insertAtSelection = insertPosition;

    model.insertContent(imageElement, insertAtSelection);

    // Inserting an image might've failed due to schema regulations.
    if (imageElement.parent) {
      writer.setSelection(imageElement, 'on');
    }
  });
}

// Implements the pattern: http(s)://(www.)example.com/path/to/resource.ext?query=params&maybe=too.
const IMAGE_URL_REGEXP = new RegExp(String(/^(http(s)?:\/\/)?[\w-]+\.[\w.~:/[\]@!$&'()*+,;=%-]+/
  .source
  + /\.(jpg|jpeg|png|gif|ico|webp|JPG|JPEG|PNG|GIF|ICO|WEBP)/.source
  + /(\?[\w.~:/[\]@!$&'()*+,;=%-]*)?/.source
  + /(#[\w.~:/[\]@!$&'()*+,;=%-]*)?$/.source));

export default class AutoImage extends Plugin {
  // static get requires() {
  //   return [Clipboard, Undo];
  // }

  static get pluginName() {
    return 'AutoImage';
  }

  constructor(editor) {
    super(editor);
    this._positionToInsert = null;
  }

  init() {
    const { editor } = this;
    const modelDocument = editor.model.document;

    this.listenTo(editor.plugins.get('ClipboardPipeline'), 'inputTransformation', () => {
      const firstRange = modelDocument.selection.getFirstRange();

      const leftLivePosition = LivePosition.fromPosition(firstRange.start);
      leftLivePosition.stickiness = 'toPrevious';

      const rightLivePosition = LivePosition.fromPosition(firstRange.end);
      rightLivePosition.stickiness = 'toNext';

      modelDocument.once('change:data', () => {
        this._embedImageBetweenPositions(leftLivePosition, rightLivePosition);

        leftLivePosition.detach();
        rightLivePosition.detach();
      }, {
        priority: 'high',
      });
    });

    editor.commands.get('undo').on('execute', () => {
      if (this._timeoutId) {
        global.window.clearTimeout(this._timeoutId);
        this._positionToInsert.detach();

        this._timeoutId = null;
        this._positionToInsert = null;
      }
    }, {
      priority: 'high',
    });
  }

  _embedImageBetweenPositions(leftPosition, rightPosition) {
    const { editor } = this;
    // TODO: Use a marker instead of LiveRange & LivePositions.
    const urlRange = new LiveRange(leftPosition, rightPosition);
    const walker = urlRange.getWalker({
      ignoreElementEnd: true,
    });

    let src = '';

    for (const node of walker) {
      if (node.item.is('$textProxy')) {
        src += node.item.data;
      }
    }

    src = src.trim();

    // If the URL does not match the image URL regexp, let's skip that.
    if (!src.match(IMAGE_URL_REGEXP)) {
      urlRange.detach();

      return;
    }

    // Position will not be available in the `setTimeout` function so let's clone it.
    this._positionToInsert = LivePosition.fromPosition(leftPosition);

    // This action mustn't be executed if undo was called between pasting and auto-embedding.
    this._timeoutId = global.window.setTimeout(() => {
      // Do nothing if image element cannot be inserted at the current position.
      // See https://github.com/ckeditor/ckeditor5/issues/2763.
      // Condition must be checked after timeout - pasting may take place on an element, replacing it. The final position matters.
      const imageCommand = editor.commands.get('insertImage');

      if (!imageCommand.isEnabled) {
        urlRange.detach();

        return;
      }

      editor.model.change((writer) => {
        this._timeoutId = null;

        writer.remove(urlRange);
        urlRange.detach();

        let insertionPosition;

        // Check if the position where the element should be inserted is still valid.
        // Otherwise leave it as undefined to use the logic of insertImage().
        if (this._positionToInsert.root.rootName !== '$graveyard') {
          insertionPosition = this._positionToInsert.toPosition();
        }

        insertImage(editor.model, {
          src,
        }, insertionPosition);

        this._positionToInsert.detach();
        this._positionToInsert = null;
      });
    }, 100);
  }
}
