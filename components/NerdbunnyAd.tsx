import React from "react"

const NerdbunnyAd = () => {
    return (
        <div>

        <div>NerdbunnyAd</div>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span  aria-live="polite" >15</span>
    </span>
    days
  </div>
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span aria-live="polite" >10</span>
    </span>
    hours
  </div>
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span aria-live="polite" >24</span>
    </span>
    min
  </div>
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-5xl">
      <span aria-live="polite" >59</span>
    </span>
    sec
  </div>
</div>

        </div>
    )
}

export default NerdbunnyAd;