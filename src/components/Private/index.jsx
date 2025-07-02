import { Modal } from "antd";

const Private = ({ isOpen, setIsOpen }) => {
    return (
                <Modal
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    footer={null}
                    width={300}
                    className="modal"
                >
                    <p className="lg:text-lg md:text-base text-sm text-[#343434] font-bold">非公開について</p>
                    <p className="lg:text-base md:text-sm text-xs text-[#343434] mt-8">
                        <span className="lg:text-[0.7rem] md:text-[0.6rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-md" onClick={() => setIsOpen(!isOpen)}>非公開</span>
                        の項目は、応募した求人機関のみ閲覧できます。応募していなければ、どこからも閲覧されることはありません。
                    </p>
                </Modal>
    )
}

export default Private;