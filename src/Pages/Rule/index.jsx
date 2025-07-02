import React from "react";
import { useEffect } from "react";

const CSRule = () => {
  useEffect(() => {
    document.title = "利用規約・プライバシーポリシー | JobJob (ジョブジョブ)";
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="pb-8 bg-[#F8F8F8] h-full">
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
              本規約は、本サービス提供条件および本サービスの利用に関するJobJob合同会社（以下、「当社」といいます。）と求職者との間の権利義務関係を定めることを目的とし、求職者と当社との間の本サービスの利用に関わる一切の関係に適用されます。
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
              「本サービス」とは、本ジョブジョブサービスをいいます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              「本ジョブジョブサービス」とは、当社がジョブジョブの名称で企画・運営する求人情報等提供サービスをいいます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              「求職者」とは、本サービスを利用して求職を行う個人をいいます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              「求人事業者」とは、当社と契約を締結し、求人情報を本サービスへ掲載する株式会社、医療法人その他の法人および個人事業主、その他の事業者をいいます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              「本契約」とは、求職者が、当社に対し、本規約の各条項を遵守しつつ、本サービスを利用することを約することをいいます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">6.</span>
              「本サイト」とは、当社が、本サービスを提供するためのウェブサイトをいいます。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第3条（求職者）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              求職者は、本サービスの利用に際し、本規約の定めに従うことを承諾したものとみなします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              求職者は、自らの意思によって本サービスを利用するものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              求職者が、本サイト内の申込フォームに所定の事項を記入し、記入データを当社が受信したことをもって、本サービスへの登録を完了し、本契約が成立したものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>{" "}
              求職者は、本サービスにおいて登録した情報を、求職者自らが変更、追加、削除できるものとし、常に求職者が責任をもって正確な状態に保つものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              求職者は、自らの意思により本サービスへの登録を削除し、解約することができます。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第4条（禁止事項・損害賠償）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>{" "}
              求職者は、以下の各行為を行ってはならないものとします。
              <br />
              <span className="number pt-1">(1)</span>{" "}
              当社に対し虚偽の情報を登録または提供すること
              <br />
              <span className="number pt-1">(2)</span>{" "}
              当社に対し本サービスを通じて採用が行われた事実を隠蔽するなどの求人事業者の不正行為に協力する行為（ただし、求職者が、当社に対し、求人事業者側の不正行為の事実を申告した場合には、当該求職者はその責を負わないものとします。)
              <br />
              <span className="number pt-1">(3)</span>{" "}
              正当な理由なく、面談、選考試験または面接を事前の連絡なく欠席する等の行為
              <br />
              <span className="number pt-1">(4)</span>{" "}
              同一の求人事業者へ頻繁に応募を繰り返す等によって当該求人事業者の業務を妨害する行為、またはそのおそれのある行為
              <br />
              <span className="number pt-1">(5)</span>{" "}
              他人の知的財産権、プライバシーに関する権利、その他の権利または利益を侵害する行為
              <br />
              <span className="number pt-1">(6)</span>{" "}
              コンピューター・ウイルスその他の有害なコンピューター・プログラムを含む情報を送信する行為
              <br />
              <span className="number pt-1">(7)</span>{" "}
              個人や団体を誹謗中傷する行為
              <br />
              <span className="number pt-1">(8)</span>{" "}
              本サービスの運営を妨げる行為
              <br />
              <span className="number pt-1">(9)</span>{" "}
              本サービスで得た情報を本サービスの利用目的の範囲を超えて第三者に譲渡する行為または営利目的で譲渡する行為
              <br />
              <span className="number pt-1">(10)</span> 公序良俗に反する行為
              <br />
              <span className="number pt-1">(11)</span>{" "}
              法令、条例等に反する一切の行為
              <br />
              <span className="number pt-1">(12)</span>{" "}
              その他本サービスの提供を継続することが困難であると当社が判断する一切の行為
              <br />
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">2.</span>
              求職者が本規約の各条項に違反し、当社または第三者に対して損害を与えた場合には、求職者は当社または第三者に対し損害賠償義務を負うものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第5条（情報の変更・削除、解除等）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、求職者が本規約第4条1項各号の行為を含む本規約に違反する行為をし、または、その行為をする恐れがある場合には、当該求職者に何ら事前の通知をすることなく以下の措置を講じることができるものとします。
              <br />
              <span className="number pt-1">(1)</span>{" "}
              求職者が本サービスにおいて登録した情報の全部または一部についての変更または削除
              <br />
              <span className="number pt-1">(2)</span>{" "}
              本契約の解除およびそれに伴う本サービス利用の停止または本サービスの求職者としての登録の抹消
              )
              <br />
              <span className="number pt-1">(3)</span>{" "}
              その他当社が必要と認める措置
              <br />
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第6条（提供情報の利用）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              当社は、本サービスにおける個人情報の取扱いについては、「個人情報保護方針」および「個人情報の取り扱いについて」に従うものとします。求職者は、本サービスを利用する場合には、「個人情報の取扱いについて」の各規定に従うことに同意したものとみなします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              当社は、本サービスを提供する上で求職者にとって必要な情報を、求職者に対し、電子メール、郵便、電話、対面での伝達等によって連絡をすることができるものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              求職者は、次の各号に定められた事項を予め承諾するものとします。
              <br />
              <span className="number pt-1">(1)</span>{" "}
              当社が本サービスを提供するにあたり、応募状況、内定状況、就職状況その他の本サービスの利用状況の確認、本サイトの構築・改良・メンテナンス、サービス品質の維持向上、トラブル及び損害発生の回避等に必要な範囲内で、求職者・求人事業者間メッセージの送受信履歴・開封状況・内容を確認および利用することがあること
              <br />
              <span className="number pt-1">(2)</span>{" "}
              本契約の終了後も本項の定めは有効に存続すること
              <br />
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              当社は、個人情報以外の登録情報または本サービスの利用状況についての情報を、あらゆるものに二次利用することができるものとします。また、これらの情報に関わる知的財産権は当社が保有するものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第7条（求職者へのアンケート等）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              当社は、求職者に対し、応募状況、内定状況、就職状況を含む本サービスおよびその利用に関するアンケート等を実施することがあります。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              前項の場合において、求職者は、自らの責任に基づいて情報や意見等を提供するものとし、自己の提供する情報や意見等については、当社に対し真実性、正確性を保証するものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>{" "}
              当社は、前項のアンケート等の結果につき、当社が編集発行する情報媒体または本サービスを含む当社が運営管理するウェブサイト上に、求職者の承諾を得ることなく、個人情報を含まない形で、編集および転載することができます。この場合において、転載したアンケート結果の内容の著作権はすべて当社に帰属するものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第8条（サービス内容の変更）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              当社は、求職者の承諾を得ることなく、本サービスの内容を変更することができるものとします。
              <br />
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第9条（サービスの停止・終了等）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              当社は、以下の各号のいずれかに該当する事由により求職者への事前の通知および承諾を要することなく、本サービスを停止または終了することができます。
              <br />
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              本サービス運営のためのシステム(以下、「本システム」といいます。)の保守、更新等を定期的または臨時に行う場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              ウィルス被害、火災、停電、天災地変などの不可抗力により、本サービスの提供が困難な場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>{" "}
              第三者の故意または過失による行為によって発生した本システムの不具合について対策を講じる必要がある場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>{" "}
              その他、不測の事態により、当社が本サービスの提供が困難と判断した場合
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第10条（免責）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              当社は、求人事業者の情報、広告その他第三者により提供される情報、求職者等が本サービスに登録し掲載する情報等に関し、内容の正確性、有用性等について何らの保証もしないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              当社は、求職者の本サービスへの登録および本サービスの利用から生じる一切の損害に関して、責任を負わないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>{" "}
              当社は、当社による本サービスの提供の中断、停止、利用不能または変更、求職者の情報の削除または消失、求職者の登録の抹消、本サービスの利用によるデータの消失または機器の故障もしくは損傷、その他本サービスに関連して求職者が被った損害につき、一切責任を負わないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              本サイトから他のウェブサイトへのリンクまたは他のウェブサイトから本サイトへのリンクが提供されている場合において、当社は、本サイト以外のウェブサイトおよびそこから得られる情報に関して如何なる理由に基づいても一切の責任を負わないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              当社は、求職者による本サービスの利用によって、就職または転職が成功することを保証しないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">6.</span>
              当社が本サービスに関して求職者に対して損害賠償責任を負うべき場合でも、当社に故意または重過失がある場合を除き、当社の責任は直接損害に限るものとし、求職者の逸失利益などの間接損害については損害賠償責任を負わないものとします。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">7.</span>
              職業安定法第32条の13に定める取扱職種の範囲等の明示については、当社はこれを電子メール等の送信の方法により行うものとし、求職者からの別段の異議のない限り、当社は求職者がこれを希望しているものとみなします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第11条（暴力団等排除条項）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              求職者は、現在、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロまたは特殊知能暴力団等、その他これらに準ずる者（以下、これらを「暴力団員等」といいます。）に該当しないこと、および以下の各号のいずれにも該当しないことを表明し、かつ将来にわたっても該当しないことを確約するものとします。
              <br />
              <span className="number pt-1">(1)</span>{" "}
              暴力団員等が経営を支配していると認められる関係を有すること
              <br />
              <span className="number pt-1">(2)</span>{" "}
              暴力団員等が経営を実質的に関与していると認められる関係を有すること
              <br />
              <span className="number pt-1">(3)</span>{" "}
              自己もしくは第三者の不正の利益を図る目的または第三者に損害を加える目的をもってするなど、不当に暴力団員等を利用していると認められる関係を有すること
              <br />
              <span className="number pt-1">(4)</span>{" "}
              暴力団員等に対して資金等を提供し、または便宜を供与するなどの関与をしていると認められる関係を有すること
              <br />
              <span className="number pt-1">(5)</span>{" "}
              役員または経営に実質的に関与している者が暴力団員等と社会的に非難されるべき関係を有すること
              <br />
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              求職者は、自らまたは第三者を利用して以下の各号のいずれかに該当する行為を行わないことを確約するものとします。
              <br />
              <span className="number pt-1">(1)</span> 暴力的な要求行為
              <br />
              <span className="number pt-1">(2)</span>{" "}
              法的な責任を超えた不当な要求行為
              <br />
              <span className="number pt-1">(3)</span>{" "}
              取引に関して、脅迫的な言動をし、または暴力を用いる行為
              <br />
              <span className="number pt-1">(4)</span>{" "}
              風説を流布し、偽計を用いまたは威力を用いて、当社、他の利用者、その他第三者の信用を毀損し、または、当社、他の利用者、その他第三者の業務を妨害する行為
              <br />
              <span className="number pt-1">(5)</span>{" "}
              風説を流布し、偽計を用いまたは威力を用いて、当社、他の利用者、その他第三者の信用を毀損し、または、当社、他の利用者、その他第三者の業務を妨害する行為
              <br />
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第12条（規約の変更)
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              当社は、求職者の承諾を得ることなく、本規約を随時変更することができます。変更の内容は、本サイト上に2週間掲載し、その期間経過をもってすべての求職者に周知されたものとみなします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第13条（本規約上の権利義務の譲渡等)
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              求職者は、当社の書面による事前の承諾を得ることなく、本規約に基づく権利または義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることや、第三者に相続させることはできません。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>{" "}
              当社が本サービスに係る事業を第三者に譲渡する場合には、求職者の承諾を得ることなく、当該事業譲渡に伴い、本規約に基づく権利および義務並びに求職者の登録情報その他の顧客情報等を含む本契約上の地位を当該事業譲渡の譲受人に譲渡することができるものとします。なお、このことは、事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合においても同様とします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              第14条（準拠法および管轄裁判所）
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              本サービスおよび本規約を含む本契約の準拠法は日本法とします。また、本サービスおよび本規約を含む本契約に関して生じる一切の紛争については、東京地方裁判所または東京簡易裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </div>
          <div className="p-6 border-b-[1px] border-[#EFEFEF]">
            <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
              個人情報保護方針
            </h1>
          </div>
          <div className="p-6">
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、よりよい情報・文化の発信を通じて、潤いのある豊かな社会の創造に貢献することを目指して事業運営をしています。適切な個人情報の取得・利用・提供を行うとともに、安全管理、正確性の確保、各種リスクからの保護に努めてまいります。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、サービスを利用される皆様の大切な個人情報を数多く取り扱っており、その保護については最優先の事項であると強く認識し、下記を実施します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-4">
              <span className="number">1.</span>
              当社は、個人情報保護マネジメントシステムを策定し、社内最高規範として遵守します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              当社は、個人情報保護マネジメントシステムおよび関連規程に従って、個人情報を取得・利用・提供します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              当社は、特定された利用目的の達成に必要な範囲で個人情報を利用し、目的外利用を行わないための措置を講じます。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              当社は、個人情報（当社が取得し、または取得しようとしている個人情報を含む）への不正なアクセス、個人情報の紛失・破壊・改ざん・漏洩などに対して、組織的・技術的・人的・物理的に合理的な安全管理措置を講じます。また、社会情勢の変化が生じた場合、または安全管理措置に不備が判明した場合には、速やかに当該措置を是正・改善します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              当社は、個人情報に関する苦情・相談に対して真摯に対応し、継続的に個人情報保護水準の改善を図ります。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">6.</span>
              当社は、個人情報保護に関する法令、国の定める指針、その他業界規範・慣習、公序良俗を遵守します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">7.</span>
              当社は、個人情報保護マネジメントシステム、関連規程および個人情報保護管理の体制を定期的に見直し、継続的に改善します。
            </p>
          </div>
          <div className="p-6 border-b-[1px] border-[#EFEFEF]">
            <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
              個人情報の取り扱いについて
            </h1>
          </div>
          <div className="p-6">
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">1.</span>
              定義
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              個人情報とは、個人に関する情報であり、本サービスを利用する一切の個人(以下、「利用者」といい、個人顧客、取引先、従業員など一切の個人が該当します。)に関する情報であって、住所、氏名、電話番号、電子メールアドレスなどの文字、映像、音声などによって当該個人を識別できる情報をいいます。また、その情報のみでは識別できない場合でも、他の情報と容易に照合することができ、結果的に個人を識別できるものも個人情報に含まれます。なお、死者に関する情報であって、その他の上記個人情報の定義に該当するもの（以下、「準個人情報」といいます。）も個人情報に含まれます。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">2.</span>
              取得する個人情報
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、以下の個人情報を取得します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              氏名
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              生年月日、性別、職業、勤務先等の属性に関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              住所、電話番号、メールアドレス等の連絡先
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              金融機関口座等のお支払いに関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              学歴、職歴、免許・資格等の経歴・資格に関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">6.</span>
              配偶者の有無、扶養家族数等の家族構成に関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">7.</span>
              写真
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">8.</span>
              お問い合わせに関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">9.</span>
              お問い合わせに関する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">10.</span>
              利用者の許諾に基づき第三者が作成した情報連携サービスから取得する情報
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">11.</span>
              前各号のほか、本サービスの利用にあたり利用者より提供を受けた情報
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">3.</span>
              個人情報の利用目的
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、下記の通り個人情報の利用目的を定め、その目的の達成に必要な範囲内で個人情報を取得・利用します。当社がやむをえず下記の目的以外の理由で取得・利用を行う場合は、利用者にその旨を通知し、その同意を得た上で、取得・利用します。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              個人情報の利用目的は以下の通りです。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              当社による利用者へのサービス提供と会員サービスに関する個人認証
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              利用者の同意に基づく、当社サービスを利用する顧客企業等への提供
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              記事作成の為のモニターや取材対象者の募集および応募受付、対象者への連絡等
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              利用者の応募先病院等への採用状況の確認連絡
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">5.</span>
              ジョブジョブにおいて、当社取引銀行を通じての勤続支援金の支払いに関する個人照会
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">6.</span>
              個人を特定できない範囲においての利用者の行動、性別、当社サービス内および当社が契約するサービス内でのアクセス履歴などを用いたターゲティング広告の配信
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">7.</span>
              個人を特定できない範囲においての当社サービスに関する統計情報の作成および利用
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">8.</span>
              個人を特定できない範囲内での当社掲載企業、提携先その他第三者へのマーケティング資料としての情報の提供
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">9.</span>
              各種アンケート、キャンペーン等のご案内、応募受付、当選者への連絡、プレゼント発送等
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">10.</span>
              イベント、セミナー（動画の視聴を含みます、以下同じです。）または当社主催コミュニティ等の参加者に関する運営管理のための連絡、案内、実施後の必要なデータの解析または分析
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">11.</span>
              当社サービス提供、お問合せ、ご相談および苦情への対応ならびに紛争の解決のために必要な業務遂行
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">12.</span>
              当社サービスのセキュリティ確保上必要な場合や、事件事故が発生した場合の調査、報告または連絡
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">13.</span>
              サービスの改善、不具合対応、および開発
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">14.</span>
              当社サービスを運用する上で必要な連絡
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">15.</span>
              当社サービスを運用する上で必要な連絡
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">4.</span>
              個人情報の第三者提供について
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              当社は、原則として、利用者の同意を得ずに個人情報を第三者に提供いたしません。ただし、以下の場合は、同意なく個人情報を提供することがあります。
              <br />
              <span className="number pt-1">(1).</span> 法令に基づく場合
              <br />
              <span className="number pt-1">(2).</span>{" "}
              人の生命、身体または財産の保護のために必要がある場合であって、利用者の同意を得ることが困難である場合
              <br />
              <span className="number pt-1">(3).</span>{" "}
              公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、利用者の同意を得ることが困難である場合
              <br />
              <span className="number pt-1">(4).</span>{" "}
              国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、利用者の同意を得ることによってその事務の遂行に支障を及ぼすおそれがあると当社が判断した場合
              <br />
              <span className="number pt-1">(5).</span>{" "}
              裁判所、検察庁、警察、弁護士会、消費者センターまたはこれらに準じる機関から、個人情報についての開示を求められた場合
              <br />
              <span className="number pt-1">(6).</span>{" "}
              利用者から明示的に第三者への開示または提供を求められた場合
              <br />
              <span className="number pt-1">(7).</span>{" "}
              合併その他の事由による事業の承継に伴って提供される場合
              <br />
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              前項の定めにかかわらず、当社は、利用者の興味・関心等に合わせた広告の配信およびその成果確認ならびにサービス提供のために、当社と提携している広告配信事業者および広告代理店に対して、個人情報を提供することがあります。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">5.</span>
              免責
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              以下の場合、第三者による個人情報の取得に関して当社は何らの責任を負いません。
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              利用者自らが第三者に個人情報を明らかにする場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              利用者または利用者以外の者が本サービスにおいて入力した情報により、個人の識別がなされた場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">3.</span>
              本サービスからリンクされる外部サイトにおいて、利用者が個人情報を提供し、または、第三者によりその個人情報が利用された場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">4.</span>
              利用者以外の者が利用者を識別できる情報(ID・パスワード等)を入手した場合
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">6.</span>
              顧客企業等の第三者における個人情報管理について
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              利用者の同意に基づき、応募先病院等、当社取引銀行、その他顧客企業等の第三者に提供された個人情報は、各提供先の第三者の責任により管理されます。
              (ID・パスワード等)を入手した場合
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">7.</span>
              個人情報の委託について
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合があります。なお、当社が個人情報の取扱いを委託する場合は、適切な委託先を選定し、個人情報が安全に管理されるよう適切に監督するものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">8.</span>
              個人情報の正確性について
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は、ご提供いただいた個人情報を正確にデータ処理するように努めます。ただし、ご提供いただいた個人情報の内容が正確かつ最新であることについては、利用者が責任を負うものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">9.</span>
              個人情報の開示等
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">1.</span>
              原則として利用者に限り、当社に提供した個人情報の開示、追加、訂正、削除、利用停止、および第三者への提供の停止(以下、「開示等」といいます。)を求めることができるものとします。個人情報の削除や利用停止等により、本サービスを受けることができなくなる場合があります。また、当社が開示等に対応することによって、以下のいずれかに該当する場合は、開示等に対応できない場合がございます。
              <br />
              <span className="number pt-1">(1)</span>{" "}
              利用者または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
              <br />
              <span className="number pt-1">(2)</span>{" "}
              当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合
              <br />
              <span className="number pt-1">(3)</span>{" "}
              法令に違反することとなる場合
            </p>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              <span className="number">2.</span>
              個人情報の利用目的の通知、および個人情報の開示等の請求については、当社は１回ごとに当社所定の手数料を徴収します。利用者は、これを行うときは必要書類に当該所定手数料分の郵便定額小為替を同封して郵送するものとします。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">10.</span>
              利用者が容易に認識できない方法による個人情報の取得について
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              本サイトにおいて、サイトの操作性や利便性の向上、アクセス状況などの統計的情報の取得、広告効果の最適化等の目的で、Cookie
              や広告ID等の技術を使用して属性情報および行動履歴に関する情報を取得することがありますが、そのような技術の使用により、利用者が入力していない個人情報を取得することはありません。お使いのブラウザの設定によりCookieの保存を拒否することもできますが、その場合はログイン等必要な機能が使用できなくなります。
            </p>
            <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
              <span className="number">11.</span>
              個人情報取扱規程の変更
            </h1>
            <p className="lg:text-sm text-xs text-[#343434] pt-1">
              当社は法令等で定めがある場合を除き、この「個人情報の取扱いについて」を随時変更することができるものとします。
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CSRule;
