import React, { useState } from "react";
import CopyIcon from "./CopyIcon";
import copy from 'copy-to-clipboard';

const CopyableRow = (props) => {
  let startBorderColor = borderColorFromOffset(props.startOffset);
  let endBorderColor = borderColorFromOffset(props.endOffset);
  if (props.disableBorder === true) {
    startBorderColor = "border-white";
    endBorderColor = "border-white";
  }
  const [hovered, setHovered] = useState(false);

  let startTime = timeTextFromNowAndOffset(props.now, props.startOffset);
  let endTime = timeTextFromNowAndOffset(props.now, props.endOffset);

  const handleEnter = (e) => {
    setHovered(true);
  };
  const handleLeave = (e) => {
    setHovered(false);
  };
  const copyStartEnd = () => {
    const toCopy = startTime + ":" + endTime;
    copy(toCopy);
    props.handleCopySuccess(toCopy);
  };

  return (
    <div className={"card-grid " + (hovered ? "gap-0 bg-yellow-200 " : "")}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={copyStartEnd}
        className={"border hover:border-0 my-1 py-2 px-4 side-col text-sm cursor-pointer hover:bg-yellow-200 rounded-sm flex flex-row items-center justify-end font-medium py-2 px-4 " +
          (hovered ? "" : "app-shadow-sm")}
      >
        <CopyIcon hovered={hovered} />
        <span className="ml-0.5">start:end</span>
      </div>
      <CopyableTime
        borderColor={startBorderColor}
        alignLeft={true}
        ts={startTime}
        hovered={hovered}
        handleCopySuccess={props.handleCopySuccess}
        handleCopyFail={props.handleCopyFail}
      />
      <CopyableTime
        borderColor={endBorderColor}
        ts={endTime}
        hovered={hovered}
        handleCopySuccess={props.handleCopySuccess}
        handleCopyFail={props.handleCopyFail}
      />
    </div>
  );
};

const borderColorFromOffset = (offset) => {
  if (offset < 0) {
    return "border-red-500";
  } else if (offset === 0) {
    return "border-gray-200";
  } else {
    return "border-green-500";
  }
};
const timeTextFromNowAndOffset = (now, offset) => {
  if (offset < 0) {
    return "bad input";
  } else {
    return now - offset;
  }
};

const CopyableTime = (props) => {
  const hovered = props.hovered;
  const alignLeft = props.alignLeft;

  const copyTs = () => {
    console.log(props.ts);
    copy(props.ts);
    props.handleCopySuccess(props.ts);
  };

  return (
    <div
      onClick={copyTs}
      className={
        "copyable-time group " +
        (hovered
          ? "bg-yellow-200 rounded-none border-yellow-200 "
          : props.borderColor + " rounded-sm app-shadow-sm ") +
        (hovered && alignLeft ? "rounded-l-sm" : "rounded-r-sm")
      }
    >
      {!hovered ? <CopyIcon hovered={hovered} /> : ""}
      <div className={"w-full font-medium " +
        (hovered && alignLeft ? "text-right " : "") +
        (hovered && !alignLeft ? "-ml-10 " : "")}>
        {props.ts + (hovered && alignLeft ? " : " : "")}
      </div>
    </div>
  );
};

export default CopyableRow;
