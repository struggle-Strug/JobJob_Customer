import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const PhotoSelectModal = ({ visible, onCancel, onSelect }) => {
  const [photos, setPhotos] = useState([]);
  // selectedPhotos は { index, photoUrl } のオブジェクトを格納します
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    if (visible) {
      // モーダルが開いたときに選択状態をリセット
      setSelectedPhotos([]);
      // 写真データを取得
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/v1/photo/`)
        .then((response) => {
          setPhotos(response.data.photos?.images || []);
        })
        .catch(() => {
          message.error("写真の取得に失敗しました");
        });
    }
  }, [visible]);

  // photo と index を受け取ることで、同じ photoUrl でも個別の識別が可能になります
  const toggleSelect = (photo, index) => {
    setSelectedPhotos((prevSelected) => {
      // すでにこの index が選択されているかチェック
      if (prevSelected.some((item) => item.index === index)) {
        // 既に選択されている場合は選択解除
        return prevSelected.filter((item) => item.index !== index);
      } else {
        // 選択されていない場合は追加
        return [...prevSelected, { index, ...photo }];
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title="写真管理から写真を選択"
      onCancel={onCancel}
      // onOk では、選択されたオブジェクトから photoUrl の配列を渡す
      onOk={() => onSelect(selectedPhotos.map((item) => item))}
      okText="選択"
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => toggleSelect(photo, index)}
            style={{
              // index を基に選択状態を判定
              border: selectedPhotos.some((item) => item.index === index)
                ? "2px solid #1890ff"
                : "1px solid #d9d9d9",
              padding: 2,
              cursor: "pointer",
            }}
          >
            <img
              src={photo.photoUrl}
              alt={`Photo ${index}`}
              style={{
                width: 100,
                height: 75,
                objectFit:
                  105 / 80 < photo.photoWidth / photo.photoHeight
                    ? "cover"
                    : "contain",
              }}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PhotoSelectModal;
