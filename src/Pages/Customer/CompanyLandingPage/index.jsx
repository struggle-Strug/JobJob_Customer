// import { ReactComponent as Avatar } from "../../../avatar.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const CompanyLandingPage = () => {
  const { customerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customerUser) {
      navigate("/customers");
    }
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, [customerUser]);

  const metadata = {
    title: "完全無料！求人掲載・採用・募集について | JobJob (ジョブジョブ)",
    description: "求人掲載から採用まで完全無料！日本最大級の医療・介護・保育・美容の求人サイトJobJob(ジョブジョブ)は掲載時、採用後と全て無料！初期費用や掲載料、応募や採用決定ごとの成果報酬も発生しません。",
    keywords: "無料,医療,介護,求人,転職,募集,パート,アルバイト,バイト,看護師,医師,薬剤師",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
  };
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
      </Helmet>
      <section className="bg-[#F1F1F1] w-full md:h-8 2xs:h-4 px-4">
        <p className="max-w-[1200px] mx-auto lg:text-base md:text-md text-sm 2sx:text-[0.5rem]">
          求人掲載・採用が完全無料 医療・歯科・介護・保育・美容 総合求人サイト
        </p>
      </section>
      <section className="flex justify-between items-center max-w-[1200px] mx-auto h-12">
        <Link to={"/"}>{/* <Avatar /> */}</Link>
        <div className="flex items-center gap-8">
          <Link
            to={"/"}
            className="lg:text-base md:text-sm text-xs text-[#F53544] hover:text-[#343434] hover:shadow-lg font-semibold bg-[#F1F1F1] rounded-3xl px-4 py-2 duration-300"
          >
            求人検索
          </Link>
          <Link
            to={"/customers/sign_in"}
            className="lg:text-base md:text-sm text-xs text-[#F53544] hover:text-[#343434] hover:shadow-lg font-semibold bg-[#F1F1F1] rounded-3xl px-4 py-2 duration-300"
          >
            ログイン
          </Link>
          <Link
            to={"/customers/new"}
            className="lg:text-base md:text-sm text-xs text-[#F53544] hover:text-[#343434] hover:shadow-lg font-semibold bg-[#F1F1F1] rounded-3xl px-4 py-2 duration-300"
          >
            新規登録
          </Link>
        </div>
      </section>
      <section className="relative max-w-[1200px] mx-auto text-center">
        <img
          src="/assets/images/companytop/fv.png"
          alt="fv"
          className="w-screen object-cover"
        />
        <div className="absolute top-0 w-full h-full lg:px-52 lg:py-16 md:px-12 md:py-8">
          <div className="bg-[#ffffffed] shadow-lg rounded-lg h-full flex flex-col items-center lg:gap-12 sm:gap-6">
            <img
              src="/assets/images/companytop/fv_1.png"
              alt="fv"
              className="md:w-4/5 xl:w-full"
            />
            <Link
              to={"/customers/new"}
              className="flex items-center gap-4 xl:px-12 xl:py-4 md:px-8 md:py-2 rounded-lg 
                                                bg-gradient-to-tr from-[#FF1610] to-[#FF5B01]
                                                text-center text-white hover:shadow-2xl hover:scale-105 xl:text-lg font-bold duration-300"
            >
              今すぐ掲載をはじめる
              <img
                src="/assets/images/companytop/ep_arrow-right-bold.png"
                alt=""
              />
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-red-500 text-white lg:py-12 md:py-8 sm:py-4 py-2">
          <div className="max-w-[1440px] mx-auto text-center">
            <p className="lg:text-xl md:text-lg text-base mb-4 font-bold">
              医療や福祉の現場をなんとかしたい
            </p>
            <p className="lg:text-xl md:text-lg text-base mb-4 font-bold">
              そのために人材採用が重要であると考えます
            </p>
            <p className="lg:text-xl md:text-lg text-base mb-4 font-bold">
              最適な人材をコストをかけずに採用できる
            </p>
            <p className="lg:text-xl md:text-lg text-base font-bold">
              そんな世界を実現するためにJobJobは進化し続けます
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-[1440px] mx-auto flex flex-col justify-center py-20 gap-20 px-4">
        <div className="flex flex-col items-center">
          <h1 className="lg:text-2xl md:text-xl text-base font-bold">
            JobJobの求人採用
          </h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex flex-col items-center gap-12 max-w-[1000px] mx-auto">
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/companytop/Group 11.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-xl md:text-lg text-base font-bold mt-4">
                求人掲載から採用まで完全無料!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/companytop/Group 12.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-xl md:text-lg text-base font-bold mt-4">
                掲載期間は無制限!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/companytop/Group 13.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-xl md:text-lg text-base font-bold mt-4">
                最短本日から求人掲載!
              </p>
            </div>
          </div>
          <div className="flex items-center border-b-2 border-[#FF6B56]">
            <p className="lg:text-[1.75rem] md:text-lg text-base font-bold text-[#FF6B56]">
              じっくりと最適な人材を探せて、すぐに採用できます
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#F8F8F8] mt-12 flex flex-col justify-center py-20 gap-20 px-4">
        <div className="flex flex-col items-center max-w-[1440px] mx-auto">
          <h1 className="lg:text-2xl md:text-xl text-base font-bold">
            求人掲載から採用まで完全無料!
          </h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex flex-col items-center gap-12 mx-auto w-full">
          <div className="grid grid-cols-3 max-w-[670px] w-full xl:gap-8">
            <div className="grid grid-cols-1">
              <img
                src="/assets/images/companytop/image_12.png"
                alt=""
                className="lg:w-full md:w-3/4 mx-auto"
              />
            </div>
            <div className="grid grid-cols-1">
              <img
                src="/assets/images/companytop/image_13.png"
                alt=""
                className="lg:w-full md:w-3/4 mx-auto"
              />
            </div>
            <div className="grid grid-cols-1">
              <img
                src="/assets/images/companytop/image_14.png"
                alt=""
                className="lg:w-full md:w-3/4 mx-auto"
              />
            </div>
          </div>
          <div className="max-w-[600px] mx-auto border-2 border-red-500 rounded-lg p-6 md:p-8">
            <h3 className="text-center mb-6 flex items-center justify-center gap-2">
              <span className="text-red-500">
                <img
                  src="/assets/images/companytop/Vector.png"
                  alt="vector"
                  className="border-none"
                />
              </span>
              <span className="font-bold lg:text-xl md:text-lg text-base">
                無料で掲載・利用できる理由
              </span>
            </h3>
            <div className="space-y-4 text-center">
              <p className="lg:text-[0.75rem] md:text-sm text-xs font-semibold leading-5">
                JobJobは全国の医療・介護・保育・美容の業界での様々な働き方に対応した求人検索サイトです。
                <br />
                多くの求人情報が集まることで、求職者の条件に合う求人をお届けすることができ、
                <br />
                よりよい仕事探しのお手伝いができると考えています。
                <br />
                そのためJobJobの登録・利用においては費用がかからないサービスを提供し、
                <br />
                多くの企業様・施設様・店舗様にご利用いただくことで
                <br />
                より多くの求人を掲載いただけるようにしています。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-12 text-center xl:h-80 sm:h-48 overflow-hidden">
        <div className="absolute w-full xl:h-80 sm:h-48">
          <img
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
            src="/assets/images/companytop/image_22.png"
            alt="description"
          />
          <div className="absolute top-0 w-full h-full xl:px-52 xl:py-16 lg:px-36 lg:py-8 md:px-12 md:py-8 sm:px-4 sm:py-2">
            <div className="bg-[#ffffffed] max-w-[1000px] mx-auto shadow-lg rounded-lg h-full flex items-center justify-center lg:gap-8 md:gap-6">
              <img
                src="/assets/images/companytop/image_6.png"
                alt="fv"
                className="lg:w-[50%] sm:w-[45%]"
              />
              <Link
                to={"/customers/new"}
                className="flex items-center gap-4 xl:px-12 xl:py-4 md:px-8 md:py-2 rounded-lg 
                                                bg-gradient-to-tr from-[#FF1610] to-[#FF5B01]
                                                text-center text-white hover:shadow-2xl hover:scale-105 xl:text-lg font-bold duration-300"
              >
                今すぐ掲載をはじめる
                <img
                  src="/assets/images/companytop/ep_arrow-right-bold.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[-1rem] flex flex-col justify-center py-20 gap-20 bg-[#F8F8F8] px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <h1 className="lg:text-2xl md:text-xl text-base font-bold">
            無料で求人掲載!カンタン3ステップで掲載!
          </h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex flex-col items-center gap-12 max-w-[1000px] mx-auto">
          <div className="flex items-center">
            <p className="lg:text-[1rem] md:text-lg text-base font-bold leading-7 text-center">
              JobJobは、募集したい求人内容をフォーマットの項目に従い入力するだけで、
              <br />
              簡単に求人ページが作成できます。
              <br />
              最短で今日から掲載され、日本中の求職者に求人をアピールできます。
            </p>
          </div>
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-4 flex-1 h-[420px]">
              <img
                src="/assets/images/companytop/image 16.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56] text-center">
                アカウント作成と
                <br />
                施設情報・求人票を入稿 (約5分)
              </p>
              <p className="lg:text-md md:text-sm text-xs mt-4">
                「今すぐ掲載をはじめる」ボタンからアカウント登録後、案内にしたがって簡単操作で求人投稿ができます。
              </p>
            </div>
            <img
              src="/assets/images/companytop/Polygon_1.png"
              alt="triangle"
              className="mx-[-2rem] mt-[-6rem]"
            />
            <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-4 flex-1 h-[420px]">
              <img
                src="/assets/images/companytop/image 15_1.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56] text-center">
                JobJobに掲載
                <br />
                (最短当日)
              </p>
              <p className="lg:text-md md:text-sm text-xs mt-4">
                投稿された求人は、求人審査の後JobJobに掲載されます。
                掲載開始後も、求人の内容は何度でも編集できます。
              </p>
            </div>
            <img
              src="/assets/images/companytop/Polygon_1.png"
              alt="triangle"
              className="mx-[-2rem] mt-[-6rem]"
            />
            <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-4 flex-1 h-[420px]">
              <img
                src="/assets/images/companytop/image 15.png"
                alt="group"
                className="w-full"
              />
              <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56]">
                応募者管理
              </p>
              <p className="lg:text-md md:text-sm text-xs mt-4">
                応募があったらメールでお知らせします。管理画面内で応募者の情報・連絡先を確認し、個別に面談・採否をやり取りしていただけます。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center py-20 gap-20 bg-[#FFF7F2] px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <h1 className="text-2xl font-bold">JobJobの採用の強み</h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex items-center max-w-[1000px] mx-auto">
          <div className="flex flex-col">
            <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56] text-center leading-4">
              多くの求職者様にご利用いただいております。
            </p>
            <p className="flex justify-start text-lg font-bold mt-4 text-[#FF6B56] text-center leading-4">
              だから採用条件の人が見つかります。
            </p>
            <p className="lg:text-md md:text-sm text-xs mt-8">
              採用したいニーズは事業所によって多種多様です。JobJobでは多くの求職者に登録いただいており、さまざまな採用条件に
              合う求職者を見つけることができます。
            </p>
            <p className="lg:text-md md:text-sm text-xs">
              求職者の登録数が多いのでJobJobは採用できる確率が格段に高まります。
            </p>
          </div>
          <img src="/assets/images/companytop/image_18.png" alt="" />
        </div>
        <div className="flex items-center max-w-[1000px] mx-auto">
          <img src="/assets/images/companytop/image_19.png" alt="" />
          <div className="flex flex-col">
            <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56] text-center leading-4">
              職種が57職種と豊富にあるから
            </p>
            <p className="lg:text-lg md:text-base text-sm font-bold mt-4 text-[#FF6B56] text-center leading-4">
              手間なく採用できます。
            </p>
            <p className="lg:text-md md:text-sm text-xs mt-8">
              事業所の運営はさまざまな職種で支えています。となれば、求人は事業所に関わる職種の数が必要です。しかし、職種ごとに求人サービスを利用していては採用活動に負担がかかります。
            </p>
            <p className="lg:text-md md:text-sm text-xs">
              JobJobは医科・歯科・介護・保育・美容など57の職種に対応しているため、あらゆる職種を1つの求人サービスで完結できます。
            </p>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center mt-20">
          <h1 className="text-2xl font-bold">即採用につながる便利な機能</h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex flex-col items-center max-w-[1000px] mx-auto mt-12">
          <div className="flex items-center">
            <p className="lg:text-[1rem] md:text-lg text-base font-bold leading-7 text-center">
              採用のタイミングを逃さない「採用管理画面」
              <br />
              さまざまな機能でサポートいたします。
            </p>
          </div>
          {/* <img
            src="/assets/images/companytop/image 7.png"
            alt=""
            className="w-3/5 mt-4"
          /> */}
          <div className="flex flex-col justify-center gap-4 max-w-[1000px] mx-auto mt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col justify-start">
                  <p className="flex justify-start lg:text-lg md:text-base text-sm font-bold mt-4 text-center leading-3">
                    求人の複製
                  </p>
                  <p className="lg:text-md md:text-sm text-xs mt-8">
                    たくさんの求人票を用意しなければならない時も安心！
                    既に作成済みの求人票を複製して使用することが出来るので求人票作成の時間を短縮できます。
                  </p>
                </div>
                <img
                  src="/assets/images/companytop/Group 6.png"
                  alt=""
                  className=""
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col justify-start">
                  <p className="flex justify-start lg:text-lg md:text-base text-sm font-bold mt-4 text-center leading-3">
                    写真の掲載
                  </p>
                  <p className="lg:text-md md:text-sm text-xs mt-8">
                    求人票の上部に写真を掲載することができます。一緒に働くメンバーや、会社・店舗の外観・内観など職場の様子がよく分かる写真を掲載すると効果的です。
                  </p>
                </div>
                <img
                  src="/assets/images/companytop/Group 10.png"
                  alt=""
                  className=""
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex flex-col justify-start">
                  <p className="flex justify-start lg:text-lg md:text-base text-sm font-bold mt-4 text-center leading-3">
                    求人タグ機能
                  </p>
                  <p className="lg:text-md md:text-sm text-xs mt-8">
                    求人入稿時には、診療科目や仕事内容、サービス内容、特徴などを誤解なく適格に伝えるために、タグ機能で選択す
                    るだけで簡単に登録できます。
                  </p>
                </div>
                <img
                  src="/assets/images/companytop/Group 8.png"
                  alt=""
                  className="pl-4"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col justify-start ml-5">
                  <p className="flex justify-start lg:text-lg md:text-base text-sm font-bold mt-4 text-center leading-3">
                    選考管理
                  </p>
                  <p className="lg:text-md md:text-sm text-xs mt-8">
                    採用活動を続けていると求職者の選考状況がわかりづらくなります。ひと目で選考状況が把握できるように作られています。で求人票作成の時間を短縮できます。
                  </p>
                </div>
                <img
                  src="/assets/images/companytop/Group 9.png"
                  alt=""
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-20 text-center xl:h-80 sm:h-48 overflow-hidden">
        <div className="absolute w-full xl:h-80 sm:h-48">
          <img
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
            src="/assets/images/companytop/image_22.png"
            alt="description"
          />
          <div className="absolute top-0 w-full h-full xl:px-52 xl:py-16 lg:px-36 lg:py-8 md:px-12 md:py-8 sm:px-4 sm:py-2">
            <div className="bg-[#ffffffed] max-w-[1000px] mx-auto shadow-lg rounded-lg h-full flex items-center justify-center lg:gap-8 md:gap-6">
              <img
                src="/assets/images/companytop/image_6.png"
                alt="fv"
                className="lg:w-[50%] sm:w-[45%]"
              />
              <Link
                to={"/customers/new"}
                className="flex items-center gap-4 xl:px-12 xl:py-4 md:px-8 md:py-2 rounded-lg 
                                                bg-gradient-to-tr from-[#FF1610] to-[#FF5B01]
                                                text-center text-white hover:shadow-2xl hover:scale-105 xl:text-lg font-bold duration-300"
              >
                今すぐ掲載をはじめる
                <img
                  src="/assets/images/companytop/ep_arrow-right-bold.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center mt-20 px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <h1 className="text-2xl font-bold">よくある質問</h1>
          <img
            src="/assets/images/companytop/Rectangle_13.png"
            alt="jobjob"
            className="mt-4"
          />
        </div>
        <div className="flex flex-col items-center max-w-[662px] mx-auto mt-12">
          <p className="text-lg font-bold">
            料金やサポート体制、機能についてなど、よくあるご質問をご説明します。
          </p>
          <div className="flex flex-col gap-4 w-full mt-12">
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                本当に無料で使えますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                はい。JobJobは「初期費用」「掲載費用」「採用成功報酬」がかからず、募集から採用まで一貫して無料で
                利用できます。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                求人広告の掲載期間は決まっていますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                掲載期間は定めておりません。必要なタイミングで掲載し、採用ニーズのない時期は応募停止することもできます。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                掲載する求人数に制限はありますか?また、求人を増やすことで掲載料はかかりますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                掲載する求人数に制限はありません。費用も一切かかりません。ただし同じ採用枠を2つ以上掲載できません。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                申し込みからどの位で掲載をはじ゙められますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                最短で当日中、遅くとも5営業日以内に掲載開始が可能です。弊社の審査状況や時期により変動することがありますので、お気軽にお問い合わせください。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                新規登録の方法を教えてください。必要な書類などありますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                新規登録にあたって申込書等は必要ありません。メールアドレス・電話番号をお持ちであれば、簡単に登録いただけます。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                求人票の入力は簡単ですか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                はい。仕事内容・勤務地・給与条件等の入力項目と選択項目がありますので、それに沿って求人内容を入力いただくだけで求人票の入力が完了します。タグ機能によりカンタン選択するだけで情報を入力いただけます。
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 4.png"
                alt="group"
                className=""
              />
              <p className="text-md font-bold justify-start">
                サポート体制はどのようになっていますか？
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <img
                src="/assets/images/companytop/Group 5.png"
                alt="group"
                className="-translate-y-[50%]"
              />
              <p className="text-md flex justify-start">
                お問い合わせにはメールにてご回答いたします。回答には数営業日頂く場合もあります。お電話・ご訪問
                による対応や、操作の代行は行っておりません。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-20 text-center xl:h-80 sm:h-48 max-h-[320px] overflow-hidden">
        <div className="relative w-full xl:h-80 sm:h-48">
          <img
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            src="/assets/images/companytop/image_22.png"
            alt="description"
          />
          <div className="relative w-full h-full xl:px-52 xl:py-16 lg:px-36 lg:py-8 md:px-12 md:py-8 sm:px-4 sm:py-2">
            <div className="bg-[#ffffffed] max-w-[1000px] mx-auto shadow-lg rounded-lg h-full flex items-center justify-center lg:gap-8 md:gap-6">
              <img
                src="/assets/images/companytop/image_6.png"
                alt="fv"
                className="lg:w-[50%] sm:w-[45%]"
              />
              <Link
                to={"/customers/new"}
                className="flex items-center gap-4 xl:px-12 xl:py-4 md:px-8 md:py-2 rounded-lg 
                                                bg-gradient-to-tr from-[#FF1610] to-[#FF5B01]
                                                text-center text-white hover:shadow-2xl hover:scale-105 xl:text-lg font-bold duration-300"
              >
                今すぐ掲載をはじめる
                <img
                  src="/assets/images/companytop/ep_arrow-right-bold.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#343434] w-full h-20 flex items-center px-4">
        <div className="max-w-[1000px] mx-auto flex items-center justify-start w-full gap-4">
          <Link to={"/"}>
            <img
              src="/assets/images/companytop/logo_negative_horizontal00_1.png"
              alt="logo"
              className=""
            />
          </Link>
          <Link
            to={"/customers/rule"}
            className="text-white text-sm hover:text-[#7a7a7a] duration-200"
          >
            利用規約
          </Link>
          <Link
            to={"/customer/sign_in"}
            className="text-white text-sm hover:text-[#7a7a7a] duration-200"
          >
            ログイン
          </Link>
        </div>
      </section>
    </>
  );
};

export default CompanyLandingPage;
