import React from 'react';

interface Props {
  images: string[];
}

export default function ImageGrid({ images }: Props) {
  return (
    <div className="px-4 mt-6 flex gap-4 container-custom">
      <div>
        <img
          src={images?.[0]}
          className="rounded-2xl object-cover"
          style={{ width: 651, height: 470 }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <img
          src={images?.[1] || images?.[0]}
          className="rounded-2xl object-cover"
          style={{ width: 529, height: 302 }}
        />

        <div className="flex gap-4">
          <img
            src={images?.[2] || images?.[0]}
            className="rounded-2xl object-cover"
            style={{ width: 254.5, height: 148 }}
          />

          <img
            src={images?.[3] || images?.[0]}
            className="rounded-2xl object-cover"
            style={{ width: 254.5, height: 148 }}
          />
        </div>
      </div>
    </div>
  );
}
