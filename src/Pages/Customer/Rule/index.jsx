import { useEffect } from "react";

const Rule = () => {
  useEffect(() => {
    document.title = "利用規約・プライバシーポリシー | JobJob (ジョブジョブ)";
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="pt-16 pb-8 bg-[#F8F8F8] h-full">
      <div className="max-w-[1000px] mx-auto bg-white shadow-lg">
        <div className="p-6 border-b-[1px] border-[#EFEFEF]">
          <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
            ジョブジョブ利用規約
          </h1>
        </div>
        <div className="p-6">
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
            第1条（適用）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>{" "}
            本規約は、本サービスの提供条件および本サービスの利用に関するJobJob合同会社（以下、「当社」といいます。）とお客様との間の権利義務関係を定めることを目的とし、お客様と当社との間の本サービスの利用に関わる一切の関係に適用されます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>{" "}
            本サービスに関して、本規約以外に個別の契約、覚書、合意書等（以下、「個別規定」といいます。）が存在する場合、個別規定は本規約の一部を構成するものとします。本規約の内容と、個別規定の内容が異なる場合は、個別規定において別途の定めがある場合を除き、個別規定が優先して適用されるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            本規約外における本サービスのガイドライン、マニュアル等（以下、「ガイドライン等」といいます。）は本サービスの利用に関する準則として本規約の一部を構成するものとします。本規約の内容と、ガイドライン等の内容が異なる場合は、本規約が優先して適用されるものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第2条（定義）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            「本サービス」とは、当社が企画・運営する人材採用サービス「ジョブジョブ」をいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            「本サイト」とは、当社が、本サービスを提供するためのウェブサイトをいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            「お客様」とは、本サービスを利用して求人募集をするすべての個人事業主、個人経営者または法人その他の団体をいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            「ユーザー」とは、お客様が本サービスの利用を認め、当社所定の方法により、本サービスを利用することが可能となった者をいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            「求職者」とは、本サービスを利用して求職を行う個人のことをいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">6.</span>
            「本契約」とは、当社がお客様に対し、本サービスを提供し、お客様が当社に対し、利用料金を支払うことを約することをいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">7.</span>
            「採用」とは、雇用形態を問わず、求職者が初出社、初勤務すること（無給・有給を問わず、研修や体験勤務・試用期間中の勤務等、求職者の作業による利益・効果がお客様に帰属し、かつ、お客様と求職者との間に使用従属関係が認められる、法律上の労働に当たる行為を含みます。）をいいます。なお、業務委託契約の締結等により、採用による労働の提供と同等程度の便益をお客様にもたらす状態が生じた場合にも、本号に定める「採用」が発生したものとみなします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">8.</span>
            「内定」とは、求職者を採用することがお客様において決定したことをいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">9.</span>
            「正職員」とは、期間の定めのない雇用契約をもって労働に従事する者をいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">10.</span>
            「契約職員」とは、期間の定めのある雇用契約をもって労働に従事する者をいいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">11.</span>
            「パート・バイト」とは、雇用期間の定めの有無にかかわらず、一週間の所定労働時間が同一の事業所に雇用される正職員・契約職員の一週間の所定労働時間に比し短い労働者をいいます。なお、お客様において短時間正職員制度を設け、当該制度に基づき短時間勤務を行う正職員、育児・介護休業法に基づき短時間勤務を行う正職員・契約職員、および、疾病その他の事情に基づき短時間勤務となる正職員・契約職員は、「パート・バイト」にはあたりません。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">12.</span>
            「業務委託」とは、契約書面の有無にかかわらず、お客様が求職者に対してある業務の実施を委託し、求職者がこれを承諾することで成立する契約関係をいい、民法上の請負か委任のいずれかを問わないものとします。なお、本規約における「雇用契約」、「退職」等の用語の解釈は、業務委託については適宜読み替えて適用するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第3条（契約の成立）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様が、本規約に同意の上、当社所定の「ジョブジョブ利用申込書」に所定の事項を記入し、それを当社が受領したこと、または、本サイト内の申込フォームに記入し、記入データを当社が受信したことをもって、本契約のお申込とします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            本契約のお申込に対して、当社がお客様のお申込を承諾することによって、当社とお客様との間に本契約が成立したものとします。当社は本契約の成立後速やかに、本サイトを利用するために必要な情報等を記載したサービス利用開始通知を、お客様に対して送付するものとします。なお、お客様は、本サイトを利用するために必要なIDおよびパスワードが第三者に知られないよう管理し、また、ユーザーに管理させる責任を負い、これらを用いてなされた一切の行為についてその責任を負います。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            本契約の成立後、お客様は本サービスの利用を開始することができます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>{" "}
            お客様は、本サービスの利用に際し、本規約のすべてに合意したものとみなします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            お客様は、本サービスの利用に際し、ユーザーに本規約のすべてを遵守させるものとします。ユーザーによる本規約の違反は、お客様による本規約の違反とみなし、お客様は、当該ユーザーと連帯して責任を負います。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第4条（利用料金）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様は、本サービスの利用にあたり、本サービスの管理画面その他の方法により当社が別途お客様に提供する「ジョブジョブ採用単価」に記載された金額を下限とする採用単価を設定するものとします。なおフリープランにおいては利用料金は発生せず、個別にキャンペーン料金等が設定されている場合は、それを優先します。当社は、「ジョブジョブ採用単価」を随時改定することができるものとし、その際は本規約の改定を行う場合の手続に準じるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            本サイトの応募機能から応募した求職者またはスカウトメール等の本サービスのその他の機能を通じて採用した求職者が、第2条第7項に定める採用に該当した場合、お客様は当社に対し、本サービスの利用料金を支払う義務を負うものとし、その義務を負った日を「利用料金発生日」といいます。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            前項の「利用料金」は、フリープランと個別にキャンペーン料金等が設定されている場合でない限り、求職者が応募した時点においてお客様が本サービスにおいて設定していた採用単価（消費税別）に採用人数を乗じた金額とします。また、本サービスにおける求職者の応募が確認できない場合でも、スカウトメール等の本サービスのその他の機能を通じて採用した場合、お客様が当該サービスを利用した時点において設定していた採用単価（消費税別）に採用人数を乗じた金額を「利用料金」とします。なお、求職者が応募したまたはスカウト等を受けた採用職種と、お客様が採用した時点の採用職種とが異なる場合、またはお客様の募集職種に対し資格に応じて複数の採用単価（消費税別）が設定されており、採用した求職者が当該複数の資格を有している場合、もっとも高い金額の採用単価を「利用料金」とみなすこととします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            お客様が、求職者を採用せず選考終了とした旨を当社に連絡した場合でも、その連絡から1年以内にお客様がその求職者を採用した場合、お客様は当社に対し、その速やかな報告および本サービスの利用料金を支払う義務を負うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            お客様は、利用料金発生日から1年以内に、求職者の就業形態をパート・バイトまたは業務委託から正職員または契約職員に変更した場合、当社に対してその旨連絡し、追加の利用料金を支払う義務を負うものとします。その際の追加料金は、求職者が応募した時点にお客様が本サービスにおいて設定していた正職員・契約職員の採用単価から、パート・バイトとして採用時に支払った金額を差し引いたものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">6.</span>{" "}
            お客様が募集職種に対し資格に応じて複数の採用単価を設定している場合において、以下各号に定める条件をいずれも満たす場合には、お客様は当社に対してその旨連絡し、追加の利用料金を支払う義務を負うものとします。その際の追加料金は、求職者が応募した時点にお客様が本サービスにおいて設定していた採用単価から、採用時に支払った金額を差し引いたものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            当該資格の一部または全部を採用後半年以内に取得することが採用時に見込まれていたこと（お客様が採用した求職者が採用時において当該資格の試験に合格している等）
            <br />
            <span className="number pt-1">(2)</span>{" "}
            当該求職者がお客様による採用後半年以内に実際に当該資格を取得したこと
            <br />
            <span className="number pt-1">(3)</span>{" "}
            お客様が採用時に支払った金額より、当該求職者が取得した資格保有者の採用単価の方が高い金額であること
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">7.</span>
            お客様が採用した求職者が、利用料金発生日において本サービスの利用を停止または終了していた場合にも、お客様は当社に対し利用料金または追加の利用料金を支払う義務を負うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">8.</span>
            お客様は、本サービスにおける有償オプションサービス（オプションサービスとは、本サービスのうち、求人広告掲載サービス以外のサービスをいいます。以下同じです。）を利用した際には、本条第3項に定める利用料金とは別に各オプションサービスについての料金（以下、利用料金、追加の利用料金とあわせて「利用料金等」といいます。）を支払う義務を負うものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第5条（利用料金等の支払い・返金）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            当社は、利用料金等が発生した月に請求書をお客様に発行します。お客様は、利用料金等の発生後、30日（日数計算は営業日ではなく暦日により計算するものとします。以下本規約で日数を記載した箇所において同様とします。）以内に、利用料金等を当社の指定する口座に送金して支払うものとします。なお、上記の送金の手数料はお客様負担とします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            利用料金等の支払を遅滞した場合、お客様は当社に対し、年14.6%（年365日日割計算）の割合による遅延損害金を支払うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            お客様が、求職者本人の責による事由に基づき求職者を解雇した場合や、求職者が自己都合による退職をした場合は、当社はお客様に対し、前条の利用料金を以下の返金料率に従って、お客様からの申請後60日以内に返金するものとします（これを当社がお客様に対して支払う「早期退職返金」といいます。）。なお、お客様の責により、お客様が雇用した求職者がお客様との雇用契約を解消した場合、本項は適用しないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            利用料金発生日を含め3日以内に退職した場合：90％
            <br />
            <span className="number pt-1">(2)</span>{" "}
            利用料金発生日を含め4日以上14日以内に退職した場合：70％
            <br />
            <span className="number pt-1">(3)</span>{" "}
            利用料金発生日を含め15日以上30日以内に退職した場合：50％
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            前条第5項および第6項に基づきお支払いいただく追加料金については、前項に従った早期退職返金は適用しないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            本条第3項に定める早期退職返金については、お客様はこれを退職の事実が発生してから6ヶ月以内に請求しなければならないものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第6条（内定・採用・不採用の報告義務）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様は求職者について、内定、不採用を決定した場合、または採用に該当した場合、当社に対して直ちに報告（本サイト上での求職者の入職状況のステータスを変更することを含みます。）を行うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            お客様は、当社から求職者に対する採用状況について回答を求められた場合、当社に対して、速やかに求職者の採用の進捗状況についての回答を行うものとします。またお客様は、その時点で求職者の内定または不採用を決定できない場合は、当社に対し、その旨を回答するものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            お客様は当社から要請を受けた場合、雇用契約書・給与明細・採用通知書・内定通知書等の求職者の採用条件に関する資料を、当社に対し提出するものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            本条第2項の場合において、お客様が採用状況についての回答を30日以内に行わない場合、当社は、お客様が求職者を採用したものとみなし、本サービスの利用料金を請求できるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            本条第3項の場合において、お客様が求職者の採用条件に関する資料を30日以内に提出しない場合、当社は、お客様が求職者を正職員で採用したものとみなし、本サービスの利用料金を請求できるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">6.</span>{" "}
            お客様が本サービスを利用する前から知得していた求職者を採用する場合は、求職者による本サービスへの応募時より前にお客様が当該求職者の採用を検討していた具体的事実を客観的に明らかにする資料を当社に提供し、当社がそれを承諾した場合のみ、利用料金の免除を受けることができます。当社へ報告せずに採用していた場合は、第7条第3項第1号に該当するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第7条（損害賠償・違約金）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様が本規約に違反する等のお客様の行為により当社に損害が生じた場合、お客様はその一切の損害（紛争解決のために当社が負担した弁護士費用を含みます。以下本条において同じです。）を当社に賠償する責を負うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            ユーザーが本規約に違反する等のユーザーの行為により当社に損害が生じた場合、お客様の行為に基づき生じた損害とみなし、お客様は、その一切の損害を当社に賠償する責をユーザーと連帯して負うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            お客様が本サービス経由で応募を受け、またはスカウトメールを送信した等により本サービスを通じて知得した求職者について、以下の各号に該当する行為を行なった場合、当社はお客様に対して第４条に定める利用料金および前項に定める損害賠償金とは別に、求職者１名ごとに下記各号に定める違約金を請求できるものとします。また本項における当社への回答または申請には、メール・電話・FAX等での回答とあわせ、本サイト上での求職者の入職状況のステータスを変更することを含むものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            求職者を採用したにもかかわらず、当社に対して採用しなかった旨を回答した場合（求職者に辞退または採用事実を当社に報告しないことを指示した場合、第4条第4項に違反して採用を報告しなかった場合も含みます。）：300万円。但し、その雇用についての利用料金が300万円を超える場合には、当該利用料金と同額。
            <br />
            <span className="number pt-1">(2)</span>{" "}
            求職者を採用した際に、雇用形態、保有資格、職種等を偽って回答した場合：150万円。但し、その雇用についての利用料金が150万円を超える場合には、当該利用料金と同額。
            <br />
            <span className="number pt-1">(3)</span>{" "}
            第4条第5項および第6項の規定により、お客様が追加の利用料金の支払義務を負うにもかかわらず、虚偽の事実を回答した場合：150万円。但し、その雇用についての追加の利用料金が150万円を超える場合には、当該追加の利用料金と同額。
            <br />
            <span className="number pt-1">(4)</span>{" "}
            求職者を採用した際に、第5条第3項に定める早期退職返金について虚偽の申請を行った場合：150万円。但し、その雇用についての利用料金が150万円を超える場合には、当該利用料金と同額。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            本サービスを通して知り得た求職者に関する情報等をお客様が第三者に開示することにより、当該第三者が当該求職者を採用した場合、当社は、お客様に対し、当該求職者をお客様が採用した場合に発生する利用料金相当額のほか、本条第1項に定める損害賠償金とは別に、求職者1名ごとに違約金として300万円を請求できるものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第8条（求人情報掲載基準）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>{" "}
            お客様は、本サービスにおいて、お客様自身の責任において求人広告を掲載するものとします。但し、お客様は以下の各号に該当する求人広告を掲載してはならないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            労働基準法その他の法律、条例、条約、規約等に反する内容
            <br />
            <span className="number pt-1">(2)</span>{" "}
            事実に反する内容、もしくは事実誤認を誘発する内容
            <br />
            <span className="number pt-1">(3)</span>{" "}
            事業内容、営業方法等が関連諸法規に違反する内容
            <br />
            <span className="number pt-1">(4)</span> 公序良俗に反する内容や表現
            <br />
            <span className="number pt-1">(5)</span>{" "}
            他社の名誉、プライバシーまたは信用を侵害する内容や表現
            <br />
            <span className="number pt-1">(6)</span>{" "}
            他業界、他業種、他社ならびに他職種への批判、誹謗、中傷
            <br />
            <span className="number pt-1">(7)</span>{" "}
            性別、民族、出身地、思想、宗教、家庭環境等、基本的人権の侵害や就職差別を助長する表現
            <span className="number pt-1">(8)</span>{" "}
            応募した求職者に対して、以下のような経済的な負担を不当に要求し、またはそそのかす場合
            <br />
            a. 商品、材料、器具等の購入
            <br />
            b. 講習会費、登録料等の支払い
            <br />
            c. 金銭等による出資
            <br />
            d. 教育施設等における出費を伴う講座等の受講
            <br />
            <span className="number pt-1">(9)</span>{" "}
            わいせつ図画、文書の頒布等にあたる表現
            <br />
            <span className="number pt-1">(10)</span>{" "}
            第三者の財産権またはプライバシーの侵害等第三者に不利益を与える内容
            <br />
            <span className="number pt-1">(11)</span>{" "}
            本サービスの運営を妨げ、または当社の信用を毀損する内容
            <br />
            <span className="number pt-1">(12)</span>{" "}
            その他、当社が社会的相当性を欠くと判断する内容
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            お客様は、前項各号に該当する事由に基づき、当社が第三者から不利益や損害の発生を主張された場合、お客様の費用と責任においてこれを解決するものとします。また、当社がかかる紛争への対応を行う場合には、お客様は当社が上記の対応のために要した費用（弁護士費用を含みます。）のすべてを負担するものとします。但し、当社がお客様からの別途申込みに応じて求人原稿・求人広告を作成代行した場合においては、この限りではありません。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第9条（情報の変更・削除等）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様は、本サービスにおいて登録した情報（お客様から当社に伝達し、お客様の求人原稿に記載されている情報を含みます。）の内容について一切の責任を負うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            お客様は、前項の登録情報を、本サービスを利用するために必要な範囲内で、お客様自らが変更、追加、削除できるものとし、常にお客様が最新かつ正確な状態に保つものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            当社は、お客様が本規約の各規定に違反し、または違反する恐れがある場合には、お客様に事前に通知することなく以下の措置を講じることができます。なお、以下の措置によりお客様が損害を受けた場合も、当社は一切の責任を負わないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            お客様が本サービスに登録した情報についての全部または一部の変更または削除
            <br />
            <span className="number pt-1">(2)</span>{" "}
            お客様が本サービスを利用することの一時的な停止
            <br />
            <span className="number pt-1">(3)</span>{" "}
            その他当社が必要と認める措置
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第10条（勤続支援金の支払い）{" "}
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            当社は、本サービスを利用し、お客様が雇用した求職者が一定期間勤続した場合に、当該求職者に対して勤続支援金を支払います。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第10条（業務の委託・提携・事業譲渡）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            当社は、本サービスにおいて、お客様の事前の承諾を得ることなく、第三者への本サービスに関する業務の委託、本サービスを含む事業の譲渡、および、第三者との本契約に関する業務についての提携等を行うことができるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴いサービス利用契約上の地位、本規約に基づく権利および義務ならびにお客様の登録事項、その他の情報を当該事業譲渡の譲受人に譲渡することができるものとし、お客様はかかる譲渡につき予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            お客様が、採用代行会社その他の採用業務を委託する第三者に本サービスを利用させる場合には、事前に当社所定の手続きを行うものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第11条（秘密保持）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            当社およびお客様は、本契約に基づき知りえた秘密情報を、善良なる管理者の注意を持って管理し、以下の各号の場合を除き、相手方の書面による事前の許可なく、本契約の目的以外の使用や、第三者への譲渡等の提供を行わないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            当該秘密情報が相手方に開示された時点で既に公知となっていた場合
            <br />
            <span className="number pt-1">(2)</span>{" "}
            相手方に開示後当社およびお客様の責によらず公知になった場合
            <br />
            <span className="number pt-1">(3)</span>{" "}
            当社またはお客様が第三者から適法に開示された場合
            <br />
            <span className="number pt-1">(4)</span>{" "}
            当社またはお客様が当該秘密情報につき公的機関から開示を求められた場合
            <br />
            <span className="number pt-1">(5)</span>{" "}
            当社またはお客様が業務遂行上の必要性から、弁護士、公認会計士その他の法律上守秘義務を負う専門家に当該情報を開示する必要がある場合
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            本条は、本契約終了後も、契約の終了事由のいかんに関わらず有効に存続するものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            当社およびお客様は、相手方の求めがあった場合、直ちに秘密情報を返却し、または、再生不能な状態で適切に廃棄するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第12条（提供情報の使用）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            本サービスにおける個人情報の取り扱いに関しては、当社が別途定めている「個人情報保護方針」および「個人情報の取り扱いについて」に従うものとします。お客様は本サービスを利用する場合には「個人情報の取り扱いについて」に従うことを承諾したものとみなします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            当社は、本サービスを提供するにあたり、お客様の指定するお客様の担当者に対し、電話、FAX、メール、郵便等により連絡することができるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>{" "}
            お客様は、次の各号に定められた事項を予め承諾するものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            当社が本サービスを提供するにあたり、採用状況その他の本サービスの利用状況の確認、本サイトの構築・改良・メンテナンス、サービス品質の維持向上、トラブル及び損害発生の回避等に必要な範囲内で、お客様・求職者間メッセージの送受信履歴・開封状況・内容を確認および利用することがあること
            <br />
            <span className="number pt-1">(2)</span>{" "}
            本契約の終了後も本項の定めは有効に存続すること
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            当社は、当社の代理人あるいは業務の委託先等（以下、「代理人等」といいます。）を介してお客様に本サービスを提供する場合、お客様の採用状況に関する情報のうち、個人情報以外の一切の情報を代理人等に提供できるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>
            当社は、お客様やお客様の担当者個人を特定する情報を除き、お客様が登録した情報や本サービスの利用状況に関する情報について、あらゆる態様で二次利用することができるものとします。その際の著作権は当社が保有するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第13条（免責）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            当社は、本サイトに掲載されるお客様が登録した情報、求職者が登録した情報、その他の第三者が登録した情報に関し、内容の正確性、有用性について何らの保証もしないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            本サービス上または本サービスを通じて提供される求人広告についての情報は、当該情報を掲載したお客様の責任により掲載されるものであり、当該求人広告についての情報に起因して求職者に何らかのトラブルや損害が生じたとしても、当該求職者と当該お客様との間でその一切を解決するものとし、当社は一切の責任を負わず、何らの賠償・補償も行わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            本サービスは求職者を紹介するサービスではなく求人広告を掲載するサービスであり、求職者が登録・応募の時点で申告していない情報について調査する義務を負うものではなく、また、申告されずにお客様による採用の過程や採用後に知得した求職者に関する情報に基づいて、お客様と求職者との間で就業に関するトラブルが生じたとしても、当社は一切責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">4.</span>
            当社は、本サイトの内容や機能等について、不具合が生じないということを含め、保証をしないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">5.</span>{" "}
            当社は、当社による本サービスの提供の中断、停止、利用不能または変更、お客様の情報の削除または消失、お客様の本サイトからのお客様登録の抹消、本サービスの利用により生じたデータの消失および機器の故障若しくは損傷、その他本サービスに関連してお客様またはユーザーが受けた損害につき一切責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">6.</span>
            本サイトから他のウェブサイトへのリンクまたは他のウェブサイトから本サイトへのリンクが設置されている場合でも、当社は、本サイト以外のウェブサイトおよびそこから得られる情報に関していかなる理由に基づいても一切の責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">7.</span>
            当社は、お客様が本サービスを利用することによる求職者の採用の成否につき、一切の責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">8.</span>
            本サイトを利用するために必要なIDおよびパスワードを用いて本サービスの利用が行われた場合には、当該利用はお客様による利用とみなして本規約の権利義務を適用するものとします。また、当該IDおよびパスワードが第三者に知られることによってお客様またはユーザーに損害が生じた場合でも、当社は一切の責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">9.</span>
            当社が本サービスに関してお客様に対して損害賠償責任を負うべき場合でも、当社の故意または重過失による場合を除き、当社が負う責任は直接かつ通常の損害に限るものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">10.</span>
            当社は、本サービスの利用に関連してお客様またはユーザーが第三者に対し損害賠償債務その他の責任を負担した場合であっても、当社の故意または重過失がある場合を除き、一切の責任を負わないものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">11.</span>
            当社は、以下の事情が生じた場合、お客様の事前の承諾なくして、本サービスの全部または一部の変更または停止、中止もしくは運営方法の変更をすることができ、それによってお客様またはユーザーに生じた損害につき、当社は、損害賠償義務を負わないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            本サービスに係る定期的または緊急のシステム（サーバー、通信回線や電源、それらを収容する建築物などを含みます。）の保守、点検、修理、変更等を行う場合
            <br />
            <span className="number pt-1">(2)</span>{" "}
            サーバー、通信回線、その他の設備の故障、障害の発生またはその他の理由により本サービスの提供ができなくなった場合
            <br />
            <span className="number pt-1">(3)</span>{" "}
            天変地変等の不可抗力により本サービスの提供ができなくなった場合
            <br />
            <span className="number pt-1">(4)</span>{" "}
            その他当社が本サービスの提供の中断・停止を必要と判断した場合
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第14条（有効期間）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            当社が、本サービスをお客様に提供する期間（以下「サービス提供期間」といいます）は当社がお客様にサービス利用開始通知をした日から1年間とします。但し、当社またはお客様のいずれかがサービス提供期間満了の30日前までに更新拒絶の意思表示をしないかぎり、サービス提供期間は1年間延長されるものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>
            前項にかかわらず、お客様は、当社への書面による通知により、本契約の全部または一部の解約の意思表示を行うことができ、当社がお客様の利用料金等の支払義務が存在しないことを確認した場合に、合意解約するものとします。なお、お客様からの解約の意思表示が行われた場合にも、解約までに発生したスカウト、応募等の事実に基づき生じるお客様の当社に対する利用料金等の支払義務が消滅することはありません。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第15条（契約の解約・解除）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            お客様が、本契約を解約する場合、当社に対し書面により解約する旨を通知することを要します。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>{" "}
            本契約解約の時点で本サイトに掲載されていたお客様の求人広告に応募していた求職者、またはスカウトメール等の本サービスのその他の機能を通じて知得していた求職者を、お客様が採用した場合、お客様は、第4条で定める利用料金を当社へ支払うものとします。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">3.</span>
            お客様が以下の各号のいずれか一つにでも該当する場合、当社は何ら催告を要さず本契約の全部または一部を解除できるものとします。なお、本項に基づく解除によりお客様が損害を受けた場合も、当社は一切の責任を負わないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            本規約のいずれかの規定に違反した場合、または、違反する恐れがある場合
            <br />
            <span className="number pt-1">(2)</span>{" "}
            本サイトに掲載した求人広告の内容と、お客様の実態が異なり、第三者から苦情を申し立てられた場合、またはその恐れがある場合
            <br />
            <span className="number pt-1">(3)</span>{" "}
            本規約違反の疑いにつき、当社から説明を求めた際に説明を行わない場合
            <br />
            <span className="number pt-1">(4)</span>{" "}
            第16条（禁止行為）に該当する場合
            <br />
            <span className="number pt-1">(5)</span>{" "}
            第17条（暴力団等排除条項）に該当する場合
            <br />
            <span className="number pt-1">(6)</span>{" "}
            破産手続開始、民事再生手続開始、会社更生手続開始、特別清算申立てその他の倒産手続、特定調停申立手続がなされ、あるいは受けた場合
            <br />
            <span className="number pt-1">(7)</span>{" "}
            その他、任意整理の通知を発する等、信用状態に重大な不安が生じたと判断される場合、または将来において生じると判断される場合
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第16条（禁止事項）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            お客様は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当社が判断する行為をしてはならないものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            法令、条例または公序良俗に違反すること
            <br />
            <span className="number pt-1">(2)</span>{" "}
            虚偽、不完全、不正確な情報を掲載すること
            <br />
            <span className="number pt-1">(3)</span>{" "}
            本サービスの内容および当社がお客様の依頼により作成した求人広告の内容を自己もしくは第三者の保有する媒体等に掲載・転載し、または複製・複写すること
            <br />
            <span className="number pt-1">(4)</span>{" "}
            求職者に対し、違法、不当、または不適切な対応を取ること
            <br />
            <span className="number pt-1">(5)</span>{" "}
            本サービス利用の過程で取得した求職者に関する情報、本サービスの内容に関する情報その他一切の情報を、本サービスによる求職者の採用以外の目的で利用すること
            <br />
            <span className="number pt-1">(6)</span>{" "}
            本サービスの運営を妨げる行為、当社もしくは当社の顧客、求職者、その他の第三者の信用を毀損し、または毀損する恐れのある行為をすること
            <br />
            <span className="number pt-1">(7)</span>{" "}
            有償無償を問わず、本サービスを利用することにより得た求人サイト運営方法の情報、技術情報、個人情報等を第三者に提供すること
            <br />
            <span className="number pt-1">(8)</span>{" "}
            本契約有効期間中および本契約終了後2年間において、本サービスを利用することにより得た求人サイト運営方法の情報、技術情報、個人情報等をもとに、当社と実質的に同様の業務を行なうこと、また第三者を通して当社と同様の業務を行うこと
            <br />
            <span className="number pt-1">(9)</span>{" "}
            本サービスのシステムを逆アセンブル、逆コンパイル、リバースエンジニアリング、変更、改変、改造等を行うこと
            <br />
            <span className="number pt-1">(10)</span>{" "}
            本契約上のお客様の権利について、第三者に使用させ、譲渡、貸与、質権の設定、その他の担保に供すること、相続させること
            <br />
            <span className="number pt-1">(11)</span>{" "}
            当社または第三者の著作権、商標権等の知的財産権その他一切の権利を侵害すること
            <br />
            <span className="number pt-1">(12)</span>{" "}
            その他前各号に類する行為であって、当社がお客様への本サービス提供を不適切と判断するに至らしめること
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第17条（暴力団等排除条項）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            お客様は当社に対し、本契約のお申込にあたり、お客様およびその役員、使用人ならびにユーザーが、暴力団等（暴力団、暴力団員、暴力団関係企業・団体またはその関係者、その他反社会的勢力）でないことを誓約するものとし、以下の各号にも同意するものとします。
            <br />
            <span className="number pt-1">(1)</span>{" "}
            お客様が自らまたは第三者を利用して、当社に対し暴力的行為、詐術、強迫的言辞、業務妨害行為等の行為を行わないこと
            <br />
            <span className="number pt-1">(2)</span>{" "}
            お客様が当社から求められた暴力団等でないことの確認に関する調査等に協力し、必要に応じて資料等を提出すること
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第18条（知的財産権等）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-4">
            <span className="number">1.</span>
            本サービスに関する著作権、特許権、商標権等の知的財産権、および、本サービスに関する一切の権利は当社に帰属します。
          </p>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            <span className="number">2.</span>{" "}
            お客様は、お客様に知的財産権が留保される著作物、求人原稿・求人広告その他の素材であっても、本サービスの利用に関連して本サイト上に掲示したものおよび当社に提供したものについては、本契約の期間中これを当社が無償で利用することを当社に対して許諾するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第19条（紛争解決）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            本契約についてお客様と当社の間に紛争が生じたときは、誠意を持って協議し、これを解決するものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第20条（準拠法）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            本規約を含む本件契約は、日本法に基づいて解釈されるものとします。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第21条（合意管轄）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            本契約についてお客様と当社の間に紛争が生じたときは、東京簡易裁判所または東京地方裁判所をもって第一審の専属的合意管轄裁判所とすることに合意します。
          </p>
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            第22条（規約の変更）
          </h1>
          <p className="lg:text-sm text-xs text-[#343434] pt-1">
            当社は、本規約の全部または一部を、任意に改定できるものとします。本サイト上もしくは電子メール等の手段で規約の改定を告知した後1ヶ月を経た時点で、お客様は改定を承諾したものとみなします。その際、本規約に基づいて現に発生している権利義務は新規約による影響を受けないものとします。
          </p>
          <h1 className="lg:text-base md:text-sm text-sm font-bold text-[#343434] pt-4 text-right">
            2025年4月1日制定
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Rule;
