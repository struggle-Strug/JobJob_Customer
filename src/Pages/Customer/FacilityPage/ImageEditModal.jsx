import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Slider } from 'antd';
import { CloseOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

const ImageEditModal = ({ visible, image, onCancel, onSave }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);

  // 16:9 aspect ratio constants
  const TARGET_ASPECT_RATIO = 16 / 9;
  const DISPLAY_WIDTH = 400;
  const DISPLAY_HEIGHT = 225; // 400 * 9/16

  useEffect(() => {
    if (visible && image) {
      loadImage();
    }
  }, [visible, image]);

  const loadImage = () => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      calculateInitialCrop();
      drawImage();
    };
    img.src = image;
  };

  const calculateInitialCrop = () => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const imgAspectRatio = img.width / img.height;
    
    let cropWidth, cropHeight;
    
    if (imgAspectRatio > TARGET_ASPECT_RATIO) {
      // 横長画像の場合 - 高さを基準に幅を計算
      cropHeight = img.height;
      cropWidth = img.height * TARGET_ASPECT_RATIO;
    } else {
      // 縦長画像の場合 - 幅を基準に高さを計算
      cropWidth = img.width;
      cropHeight = img.width / TARGET_ASPECT_RATIO;
    }

    const cropX = (img.width - cropWidth) / 2;
    const cropY = (img.height - cropHeight) / 2;

    setCropArea({
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight
    });

    // 画像を表示エリアにフィットするようにスケールを計算
    const scaleX = DISPLAY_WIDTH / cropWidth;
    const scaleY = DISPLAY_HEIGHT / cropHeight;
    const initialScale = Math.min(scaleX, scaleY);
    
    setScale(initialScale);
    setPosition({ x: 0, y: 0 });
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 背景を白に設定
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 画像の描画位置を計算
    const scaledWidth = cropArea.width * scale;
    const scaledHeight = cropArea.height * scale;
    
    const drawX = (canvas.width - scaledWidth) / 2 + position.x;
    const drawY = (canvas.height - scaledHeight) / 2 + position.y;

    // 回転の中心点を設定
    ctx.save();
    ctx.translate(drawX + scaledWidth / 2, drawY + scaledHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    
    // 画像を描画（クロップエリアのみ）
    ctx.drawImage(
      img,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight
    );
    
    ctx.restore();

    // クロップエリアの境界線を描画
    drawCropOverlay();
  };

  const drawCropOverlay = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const scaledWidth = cropArea.width * scale;
    const scaledHeight = cropArea.height * scale;
    
    const drawX = (canvas.width - scaledWidth) / 2 + position.x;
    const drawY = (canvas.height - scaledHeight) / 2 + position.y;

    // 半透明のオーバーレイ
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // クロップエリアをクリア
    ctx.clearRect(drawX, drawY, scaledWidth, scaledHeight);
    
    // クロップエリアの境界線
    ctx.strokeStyle = '#1890ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, scaledWidth, scaledHeight);
    
    // コーナーハンドル
    const handleSize = 8;
    ctx.fillStyle = '#1890ff';
    ctx.fillRect(drawX - handleSize/2, drawY - handleSize/2, handleSize, handleSize);
    ctx.fillRect(drawX + scaledWidth - handleSize/2, drawY - handleSize/2, handleSize, handleSize);
    ctx.fillRect(drawX - handleSize/2, drawY + scaledHeight - handleSize/2, handleSize, handleSize);
    ctx.fillRect(drawX + scaledWidth - handleSize/2, drawY + scaledHeight - handleSize/2, handleSize, handleSize);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const scaledWidth = cropArea.width * scale;
    const scaledHeight = cropArea.height * scale;
    const drawX = (canvas.width - scaledWidth) / 2 + position.x;
    const drawY = (canvas.height - scaledHeight) / 2 + position.y;

    // コーナーハンドルのチェック
    const handleSize = 8;
    const handles = [
      { x: drawX - handleSize/2, y: drawY - handleSize/2, type: 'nw' },
      { x: drawX + scaledWidth - handleSize/2, y: drawY - handleSize/2, type: 'ne' },
      { x: drawX - handleSize/2, y: drawY + scaledHeight - handleSize/2, type: 'sw' },
      { x: drawX + scaledWidth - handleSize/2, y: drawY + scaledHeight - handleSize/2, type: 'se' }
    ];

    const handle = handles.find(h => 
      x >= h.x && x <= h.x + handleSize && 
      y >= h.y && y <= h.y + handleSize
    );

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle.type);
    } else if (x >= drawX && x <= drawX + scaledWidth && y >= drawY && y <= drawY + scaledHeight) {
      setIsDragging(true);
    }
    
    setDragStart({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging && !isResizing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;

    if (isDragging) {
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
    } else if (isResizing) {
      // リサイズロジック（簡略化）
      const scaleFactor = 1 + (deltaX + deltaY) / 200;
      setScale(prev => Math.max(0.5, Math.min(3, prev * scaleFactor)));
    }

    setDragStart({ x, y });
    drawImage();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const handleRotate = (direction) => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90));
    drawImage();
  };

  const handleZoom = (direction) => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.1 : prev * 0.9;
      return Math.max(0.5, Math.min(3, newScale));
    });
    drawImage();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 最終的な画像を生成
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    
    // 16:9のアスペクト比で最終画像を作成
    finalCanvas.width = 800; // 高解像度
    finalCanvas.height = 450; // 800 * 9/16

    // 背景を白に設定
    finalCtx.fillStyle = '#ffffff';
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // 画像を描画
    const img = imageRef.current;
    const scaleX = finalCanvas.width / cropArea.width;
    const scaleY = finalCanvas.height / cropArea.height;
    const finalScale = Math.min(scaleX, scaleY);

    const drawWidth = cropArea.width * finalScale;
    const drawHeight = cropArea.height * finalScale;
    const drawX = (finalCanvas.width - drawWidth) / 2;
    const drawY = (finalCanvas.height - drawHeight) / 2;

    finalCtx.save();
    finalCtx.translate(drawX + drawWidth / 2, drawY + drawHeight / 2);
    finalCtx.rotate((rotation * Math.PI) / 180);
    finalCtx.drawImage(
      img,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight
    );
    finalCtx.restore();

    // Base64に変換
    const finalImageData = finalCanvas.toDataURL('image/jpeg', 0.9);
    
    // ファイルに変換
    const file = base64ToFile(finalImageData, 'edited-image.jpg');
    
    onSave({
      file: file,
      preview: finalImageData
    });
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Modal
      title="画像を編集"
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          キャンセル
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          保存
        </Button>
      ]}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* 編集ツール */}
        <div className="flex items-center space-x-4">
          <Button 
            icon={<RotateLeftOutlined />} 
            onClick={() => handleRotate('left')}
            size="small"
          >
            左回転
          </Button>
          <Button 
            icon={<RotateRightOutlined />} 
            onClick={() => handleRotate('right')}
            size="small"
          >
            右回転
          </Button>
          <Button 
            icon={<ZoomOutOutlined />} 
            onClick={() => handleZoom('out')}
            size="small"
          >
            縮小
          </Button>
          <Button 
            icon={<ZoomInOutlined />} 
            onClick={() => handleZoom('in')}
            size="small"
          >
            拡大
          </Button>
        </div>

        {/* ズームスライダー */}
        <div className="w-full">
          <label className="text-sm text-gray-600">ズーム: {Math.round(scale * 100)}%</label>
          <Slider
            min={50}
            max={300}
            value={scale * 100}
            onChange={(value) => {
              setScale(value / 100);
              drawImage();
            }}
          />
        </div>

        {/* キャンバス */}
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={DISPLAY_WIDTH}
            height={DISPLAY_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />
        </div>

        {/* 説明テキスト */}
        <div className="text-sm text-gray-600 text-center">
          <p>※表示部分は16:9で固定されています</p>
          <p>画像をドラッグして位置を調整し、コーナーをドラッグしてサイズを変更できます</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageEditModal;