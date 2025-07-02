// Loading.jsx
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className='fixed inset-0 z-50 bg-white bg-opacity-60 flex justify-center items-center'>
      <Spin size='large' />
    </div>
  );
};

export default Loading;