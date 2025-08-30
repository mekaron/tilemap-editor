import React from 'react';

export default function NavigationBar() {
  return (
    <div className="tileset_opt_field header">
      <div className="menu file">
        <span> File </span>
        <div className="dropdown" id="fileMenuDropDown">
          <a className="button item button-as-link" href="#popup2">About</a>
          <div id="popup2" className="overlay">
            <div className="popup">
              <h4>Tilemap editor</h4>
              <a className="close" href="#">&times;</a>
              <div className="content">
                <div>Created by Todor Imreorov (blurymind@gmail.com)</div>
                <br />
                <div>
                  <a className="button-as-link" href="https://github.com/blurymind/tilemap-editor">
                    Project page (Github)
                  </a>
                </div>
                <div>
                  <a className="button-as-link" href="https://ko-fi.com/blurymind">
                    Donate page (ko-fi)
                  </a>
                </div>
                <br />
                <div>Instructions:</div>
                <div>right click on map - picks tile</div>
                <div>mid-click - erases tile</div>
                <div>left-click adds tile</div>
                <div>right-click on tileset - lets you change tile symbol or metadata</div>
                <div>left-click - selects tile </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
