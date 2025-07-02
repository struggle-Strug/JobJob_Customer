import { FaFrownOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-[#F8F8F8] min-h-screen pt-16">
      <section className="container bg-white rounded-lg lg:px-12 md:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <FaFrownOpen className="w-12 h-12 text-[#FF2A3B]" />
          <h1 className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434] mt-2">
            お探しのページが見つかりません
          </h1>
          <p className="lg:text-base md:text-sm text-xs text-[#343434] mt-2">
            404 not found
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434] mt-2">
            アクセスしようとしたページが見つかりませんでした。
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            ページが削除または移動された可能性があります。
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            ご不便をおかけして申し訳ございません。
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            下記からご覧になりたいページをお探しください。
          </p>
          <Link
            to="/"
            className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-lg md:text-sm text-xs duration-500 text-[#FF2A3B] hover:text-[#343434] px-4 lg:py-4 md:py-2 py-1 rounded-lg mt-8"
          >
            トップページへ戻る
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
