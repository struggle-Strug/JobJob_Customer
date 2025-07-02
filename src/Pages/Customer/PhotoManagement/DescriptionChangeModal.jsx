import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const DescriptionChangeModal = ({
  open,
  onCancel,
  description,
  setDescription,
  updateDescription,
}) => {
  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        width={400}
        className="modal textarea"
      >
        <div className="flex flex-col p-4">
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button
              className="text-white text-base bg-[#FF2A3B] px-4 py-2 rounded-lg"
              onClick={updateDescription}
            >
              更新
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DescriptionChangeModal;
