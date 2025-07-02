import React, { useState } from "react";

const LinkRequirement = () => {
  const [copied, setCopied] = useState(false);
  const clipboardButton = (text) => {
    const content = `${text}`;
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2s
      })
      .catch((err) => {
        console.error("コピーに失敗しました: ", err);
      });
  };
  return (
    <div className="relative min-h-screen bg-white rounded-lg pt-16 clcontainer">
      <h1 className="lg:text-xl text-lg font-bold text-[#343434]">{`リンク掲載のお願い`}</h1>
      <h2 className="lg:text-lg text-base font-bold text-[#343434] mt-8">{`求人を見てもらいやすい`}</h2>
      <p className="text-sm text-[#343434] mt-2">
        皆さまからジョブジョブへのリンクをいただくことで、Google や Yahoo!
        などの検索エンジンを経由し、より多くの方が求人広告を見ていただけるようになり、皆さまの採用強化にもつながってまいります。
      </p>
      <h2 className="lg:text-lg text-base font-bold text-[#343434] mt-8">{`採用ホームページとして活用`}</h2>
      <p className="text-sm text-[#343434] mt-2">
        ジョブジョブに掲載いただいている施設ページ・求人ページを貴社の採用ホームページとして利用することで新たに採用ページを作成する手間が省けます。
      </p>
      <h2 className="lg:text-lg text-base font-bold text-[#343434] mt-8">{`リンク掲載は下記HTMLソースをコピーして簡単設置`}</h2>
      <p className="text-sm text-[#343434] mt-2">
        ご希望の見た目のバナーやテキストのHTMLソースをコピーし貴社サイトの適切な場所にそのまま貼り付けるだけで掲載いただけます。
      </p>
      <h3 className="lg:text-base text-sm font-bold text-[#343434] mt-8">{`バナー（728×90）`}</h3>
      <img
        src="/assets/images/linkrequirement/linkrequirement_1.png"
        alt=""
        className="border-[1px] mt-2"
      />
      <p className="text-sm text-[#343434] mt-2">HTMLソース</p>
      <div className="bg-slate-200 p-4 rounded-lg mt-2">
        <p className="text-sm text-[#343434]">
          {`<Link target="_blank" to="https://jobjob-jp.com/">
            <img
              alt="日本最大級の医療・介護・保育の求人サイト ジョブジョブ"
              src="/assets/images/linkrequirement/linkrequirement_1.png"
            />
          </Link>`}
        </p>
      </div>
      <button
        onClick={() =>
          clipboardButton(
            `<Link target="_blank" to="https://jobjob-jp.com/">
              <img
                alt="日本最大級の医療・介護・保育の求人サイト ジョブジョブ"
                src="/assets/images/linkrequirement/linkrequirement_1.png"
              />
            </Link>`
          )
        }
        className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#188CE0] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6"
      >
        HTMLソースをコピーする
      </button>
      <h3 className="lg:text-base text-sm font-bold text-[#343434] mt-8">{`バナー（320×50）`}</h3>
      <img
        src="/assets/images/linkrequirement/linkrequirement_2.png"
        alt=""
        className="border-[1px] mt-2"
      />
      <p className="text-sm text-[#343434] mt-2">HTMLソース</p>
      <div className="bg-slate-200 p-4 rounded-lg mt-2">
        <p className="text-sm text-[#343434]">
          {`<Link target="_blank" to="https://jobjob-jp.com/"><img alt="日本最大級の医療・介護・保育の求人サイト ジョブジョブ" src="/assets/images/linkrequirement/linkrequirement_2.png" /></Link>`}
        </p>
      </div>
      <button
        onClick={() =>
          clipboardButton(
            `<Link target="_blank" to="https://jobjob-jp.com/">
              <img
                alt="日本最大級の医療・介護・保育の求人サイト ジョブジョブ"
                src="/assets/images/linkrequirement/linkrequirement_2.png"
              />
            </Link>`
          )
        }
        className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#188CE0] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6"
      >
        HTMLソースをコピーする
      </button>
      <h3 className="lg:text-base text-sm font-bold text-[#343434] mt-8">{`テキストリンク`}</h3>
      <p className="text-sm text-[#343434] mt-2">
        <span className="text-blue-400">
          医療・介護・保育の求人サイト ジョブジョブ
        </span>
        に掲載中
      </p>
      <p className="text-sm text-[#343434] mt-2">HTMLソース</p>
      <div className="bg-slate-200 p-4 rounded-lg mt-2">
        <p className="text-sm text-[#343434]">
          {`<Link target="_blank" to="https://jobjob-jp.com/">医療・介護・保育の求人サイト ジョブジョブ</Link>に掲載中`}
        </p>
      </div>
      <button
        onClick={() =>
          clipboardButton(
            `<Link target="_blank" to="https://jobjob-jp.com/">医療・介護・保育の求人サイト ジョブジョブ</Link>に掲載中`
          )
        }
        className="bg-[#e9e9e9] hover:shadow-xl text-center font-bold lg:text-sm text-xs duration-500 text-[#188CE0] hover:text-[#343434] lg:px-12 md:px-8 px-4 lg:py-4 md:py-2 py-1 rounded-lg my-6"
      >
        HTMLソースをコピーする
      </button>
      {copied && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded shadow-md z-50">
          コピーしました！
        </div>
      )}
    </div>
  );
};

export default LinkRequirement;
