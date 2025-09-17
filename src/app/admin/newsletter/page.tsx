"use client";

import { useState, useEffect } from "react";
import { useNewsletter } from "@/hooks/useNewsletter";

export default function NewsletterAdminPage() {
  const [testEmail, setTestEmail] = useState("");
  const {
    isLoading,
    result,
    sendTestEmail,
    sendToAllUsers,
    clearResult,
    userCount,
    emailList,
    refreshUserData,
  } = useNewsletter();

  // 컴포넌트 마운트 시 사용자 데이터 로드
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleSendTestEmail = async () => {
    await sendTestEmail(testEmail);
    if (result?.success) {
      alert("테스트 이메일이 성공적으로 발송되었습니다!");
    }
  };

  const handleSendToAllUsers = async () => {
    if (
      !confirm(
        `등록된 ${userCount}명의 사용자에게 뉴스레터를 발송하시겠습니까?`
      )
    ) {
      return;
    }

    await sendToAllUsers();
    if (result?.success) {
      alert(
        `뉴스레터 발송 완료: 성공 ${result.totalSent}건, 실패 ${result.totalFailed}건`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            뉴스레터 발송 관리
          </h1>

          {/* 사용자 통계 */}
          <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-xl font-semibold text-green-900 mb-4">
              사용자 통계
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">총 등록 사용자</p>
                <p className="text-2xl font-bold text-green-600">
                  {userCount}명
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-600">이메일 주소 보유 사용자</p>
                <p className="text-2xl font-bold text-green-600">
                  {emailList.length}명
                </p>
              </div>
            </div>
            <button
              onClick={refreshUserData}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              통계 새로고침
            </button>
          </div>

          {/* 테스트 이메일 발송 */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              테스트 이메일 발송
            </h2>
            <p className="text-blue-700 mb-4">
              뉴스레터를 테스트 이메일로 먼저 발송해보세요.
            </p>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label
                  htmlFor="testEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  테스트 이메일 주소
                </label>
                <input
                  type="email"
                  id="testEmail"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendTestEmail}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "발송 중..." : "테스트 발송"}
              </button>
            </div>
          </div>

          {/* 전체 사용자 발송 */}
          <div className="mb-8 p-6 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-xl font-semibold text-red-900 mb-4">
              전체 사용자 발송
            </h2>
            <p className="text-red-700 mb-4">
              ⚠️ 주의: 등록된 모든 사용자({userCount}명)에게 뉴스레터를
              발송합니다.
            </p>
            <button
              onClick={handleSendToAllUsers}
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "발송 중..." : "전체 발송"}
            </button>
          </div>

          {/* 발송 결과 */}
          {result && (
            <div
              className={`p-6 rounded-lg border ${
                result.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    result.success ? "text-green-900" : "text-red-900"
                  }`}
                >
                  발송 결과
                </h3>
                <button
                  onClick={clearResult}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <p
                  className={`text-sm ${
                    result.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  <strong>메시지:</strong> {result.message}
                </p>
                {result.totalSent !== undefined && (
                  <p className="text-sm text-gray-600">
                    <strong>성공:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {result.totalSent}건
                    </span>
                  </p>
                )}
                {result.totalFailed !== undefined && result.totalFailed > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>실패:</strong>{" "}
                    <span className="text-red-600 font-semibold">
                      {result.totalFailed}건
                    </span>
                  </p>
                )}
              </div>

              {result.results && result.results.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">상세 결과:</h4>
                  <div className="max-h-40 overflow-y-auto border rounded-lg bg-white">
                    {result.results.map((res: any, index: number) => (
                      <div
                        key={index}
                        className="text-xs p-3 border-b last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">
                            {res.email}
                          </span>
                          {res.success ? (
                            <span className="text-green-600 font-semibold">
                              ✓ 성공
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              ✗ 실패
                            </span>
                          )}
                        </div>
                        {!res.success && res.error && (
                          <p className="text-red-500 text-xs mt-1">
                            {res.error}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 환경 설정 안내 */}
          <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">
              환경 설정 안내
            </h3>
            <div className="text-sm text-yellow-800 space-y-3">
              <p>이메일 발송을 위해 다음 환경변수들을 설정해주세요:</p>
              <div className="bg-white p-4 rounded-lg border">
                <ul className="space-y-2">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      EMAIL_USER
                    </code>
                    : 발송자 이메일 주소 (예: your-email@gmail.com)
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      EMAIL_PASSWORD
                    </code>
                    : 이메일 앱 비밀번호 (Gmail의 경우 2단계 인증 후 앱 비밀번호
                    생성)
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      SUPABASE_SERVICE_ROLE_KEY
                    </code>
                    : Supabase 서비스 역할 키
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      NEXT_PUBLIC_SITE_URL
                    </code>
                    : 사이트 URL (예: http://localhost:3000)
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Gmail 설정 방법:
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>Google 계정에서 2단계 인증 활성화</li>
                  <li>Google 계정 설정 → 보안 → 앱 비밀번호 생성</li>
                  <li>생성된 16자리 앱 비밀번호를 EMAIL_PASSWORD에 설정</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
