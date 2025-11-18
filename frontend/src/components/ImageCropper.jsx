import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Crop, X, Check, Upload } from 'lucide-react';

const ImageCropper = ({ onCropComplete, aspectRatio = null, initialImage = null }) => {
  const [src, setSrc] = useState(initialImage);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [selectedRatio, setSelectedRatio] = useState('free');
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const ASPECT_RATIOS = {
    free: { label: 'Free Form', ratio: null },
    standard: { label: '450 × 350', ratio: 450 / 350 },
  };

  useEffect(() => {
    if (aspectRatio) {
      setSelectedRatio('standard');
    }
  }, [aspectRatio]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    imageRef.current = e.currentTarget;
    const { width, height } = e.currentTarget;
    
    const currentRatio = ASPECT_RATIOS[selectedRatio].ratio;
    if (currentRatio) {
      const cropWidth = 90;
      const cropHeight = (cropWidth / currentRatio) * (width / height);
      
      setCrop({
        unit: '%',
        width: cropWidth,
        height: Math.min(cropHeight, 90),
        x: 5,
        y: 5,
      });
    }
  };

  const getCroppedImageBlob = () => {
    return new Promise((resolve, reject) => {
      if (!completedCrop || !imageRef.current || !previewCanvasRef.current) {
        reject('No crop completed');
        return;
      }

      const image = imageRef.current;
      const canvas = previewCanvasRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject('Canvas is empty');
            return;
          }
          blob.name = 'cropped-image.jpg';
          resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleCropComplete = async () => {
    try {
      const blob = await getCroppedImageBlob();
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
      onCropComplete(file, URL.createObjectURL(blob));
      handleReset();
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleReset = () => {
    setSrc(null);
    setCompletedCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRatioChange = (ratio) => {
    setSelectedRatio(ratio);
    if (imageRef.current && ASPECT_RATIOS[ratio].ratio) {
      const { width, height } = imageRef.current;
      const currentRatio = ASPECT_RATIOS[ratio].ratio;
      const cropWidth = 90;
      const cropHeight = (cropWidth / currentRatio) * (width / height);
      
      setCrop({
        unit: '%',
        width: cropWidth,
        height: Math.min(cropHeight, 90),
        x: 5,
        y: 5,
      });
    }
  };

  return (
    <div className="w-full">
      {!src ? (
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#E8DCC4] rounded-xl cursor-pointer bg-[#FAF8F3] hover:bg-[#F5EFE0] transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-3 text-[#C4A962]" />
              <p className="mb-2 text-sm text-[#6B6B6B]">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#9B9B9B]">PNG, JPG, JPEG (MAX. 5MB)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onSelectFile}
            />
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {Object.entries(ASPECT_RATIOS).map(([key, { label }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleRatioChange(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRatio === key
                      ? 'bg-[#C4A962] text-white'
                      : 'bg-[#FAF8F3] text-[#6B6B6B] hover:bg-[#E8DCC4]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg bg-[#FFF5F5] text-[#D4534F] hover:bg-[#FFE5E5] transition-colors"
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="border-2 border-[#E8DCC4] rounded-xl overflow-hidden bg-white p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECT_RATIOS[selectedRatio].ratio}
              className="max-w-full"
            >
              <img
                ref={imageRef}
                src={src}
                onLoad={onImageLoad}
                alt="Crop preview"
                className="max-w-full h-auto"
              />
            </ReactCrop>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCropComplete}
              disabled={!completedCrop}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#C4A962] text-white font-semibold rounded-xl hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-5 h-5" />
              Apply Crop
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-[#FAF8F3] text-[#6B6B6B] font-semibold rounded-xl hover:bg-[#E8DCC4] transition-colors"
            >
              Cancel
            </button>
          </div>

          <canvas
            ref={previewCanvasRef}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
