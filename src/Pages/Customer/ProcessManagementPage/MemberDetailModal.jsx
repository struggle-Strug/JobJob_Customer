import React from "react";
import { Modal } from "antd";

const MemberDetailModal = ({ open, onCancel, memberData }) => {
  const birthday = `${new Date(memberData?.birthday).getFullYear()}年${
    new Date(memberData?.birthday).getMonth() + 1
  }月${new Date(memberData?.birthday).getDate()}日`;
  const age =
    new Date().getFullYear() - new Date(memberData?.birthday).getFullYear();

  return (
    <Modal
      open={open} // Use 'open' instead of 'visible'
      onCancel={onCancel}
      footer={null} // Remove default footer if not needed
      width={1000}
      className="modal"
    >
      {memberData ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
            <div className="flex items-center justify-between w-full ">
              <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                基本情報
              </p>
            </div>
            <div className="flex flex-col w-full mt-6">
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    氏名
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.name}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    ふりがな
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.hiraganaName}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    生年月日
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {birthday}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    年齢
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">{`${age}歳`}</p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    性別
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.gender}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    都道府県
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.prefecture}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    電話番号
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                <div className="flex items-center justify-start gap-2 w-1/3">
                  <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                    メールアドレス
                  </span>
                  <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                    非公開
                  </span>
                </div>
                <div className="flex items-center justify-start w-2/3">
                  <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                    {memberData?.email}
                  </p>
                </div>
              </div>
              {memberData?.qualification?.length > 0 && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-start justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      資格/取得年月
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-start w-2/3">
                    {memberData?.qualification?.map((qualification) => {
                      return (
                        <div className="flex item-start justify-between w-4/5">
                          <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                            {qualification.qualification}
                          </p>
                          <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                            {qualification.year}-{qualification.month}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {memberData?.dependents !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      扶養家族
                    </span>
                    <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                      非公開
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.dependents}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.spouse !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      配偶者
                    </span>
                    <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                      非公開
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.spouse}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.photo !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      顔写真
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <img src={memberData?.photo} alt="face" className="w-56" />
                  </div>
                </div>
              )}
              {memberData?.selfPR !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      自己PR
                    </span>
                    <span className="lg:text-[0.55rem] md:text-[0.5rem] text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                      非公開
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 break-all">
                      {memberData?.selfPR}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
            <div className="flex items-center justify-between w-full">
              <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                学歴
              </p>
            </div>
            <div className="flex flex-col w-full mt-6">
              {memberData?.lastEducation !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      最終学歴
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.lastEducation}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.schoolName !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      学校名
                    </span>
                    <span className="lg:text-[0.6rem] md:text-[0.5rem] text-xs text-center text-[#FF2A3B] px-1 py-0.5 border-[1.5px] border-[#FF2A3B] bg-red-100 rounded-lg">
                      非公開
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.schoolName}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.department !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      学部・学科
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.department}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.major !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      専攻
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.major}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.graduationDate !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      卒業年月
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.graduationDate}
                    </p>
                  </div>
                </div>
              )}
              {memberData?.graduation !== undefined && (
                <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                  <div className="flex items-center justify-start gap-2 w-1/3">
                    <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                      卒業区分
                    </span>
                  </div>
                  <div className="flex items-center justify-start w-2/3">
                    <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                      {memberData?.graduation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg p-4 mt-4 shadow-xl">
            <div className="flex items-center justify-between w-full mt-2">
              <p className="lg:text-2xl md:text-xl text-lg font-bold text-[#343434]">
                職務経歴
              </p>
            </div>
            <div className="flex flex-col w-full mt-6">
              {memberData?.workHistories.map((workHistory, index) => {
                return (
                  <>
                    <div className="flex items-center justify-between w-full mt-2">
                      <p className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">
                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434]">
                          経歴
                        </span>
                        <span className="lg:text-[1rem] md:text-[0.8rem] text-sm font-bold text-[#343434] number pl-1">
                          {index + 1}
                        </span>
                      </p>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 mt-4">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          勤務先名
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.companyName}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          事業内容
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.contents}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          勤務開始
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.startDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          勤務終了
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          勤務形態
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.employmentType}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          職種
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.jobType}({workHistory.jobTypeDetail})
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          仕事内容
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2 break-all">
                          {workHistory.workContent}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          役職
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.officialPosition}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full border-t-[1px] border-[#e7e7e7] py-3 mb-4">
                      <div className="flex items-center justify-start gap-2 w-1/3">
                        <span className="lg:text-sm md:text-xs text-xs font-bold text-[#343434]">
                          給与
                        </span>
                      </div>
                      <div className="flex items-center justify-start w-2/3">
                        <p className="lg:text-[1rem] md:text-[0.8rem] text-sm text-[#343434] lg:pl-10 md:pl-6 pl-2">
                          {workHistory.payType}
                          {workHistory.amount}円
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>データがありません。</p>
      )}
    </Modal>
  );
};

export default MemberDetailModal;
