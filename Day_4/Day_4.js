// HTTP 메서드의 속성
//     안전(Safe)
//         호출해도 리소스를 변경하지 않는다
//         질문 : 계속 호출해서 로그 같은게 쌓여서 서버에 장애가 날 수 있지 않나?
//         답변 : 안전은 해당 리소스만 고려한다

//     멱등(Idempotent)
//         한 번 호출하든 두 번 호출하든 100번 호출하든 결과가 똑같다
//         GET, PUT, DELETE
//         똑같은 PUT 요청을 몇 번해도 결과를 대체하기 때문에 최종 결과는 같다
//         결과를 삭제하는 DELETE도 같은 요청을 여러번 해도 삭제된 결과는 같다

//         활용
//             자동 복구 매커니즘
//             DELETE 요청을 했는 데 서버 응답이 없어도 클라이언트는 다시 요청해도 된다

//         질문 : 재요청 중간에 다른 곳에서 리소스를 변경해버리면?
//         답변 : 멱등은 외부 요인으로 중간에 리소스가 변경되는 것까지는 고려하지 않는다
//                 내가 동일한 요청을 계속했을 때 멱등한지만 고려한다

//     캐시가능(Casheable)
//         응답 결과 리소스를 캐시해서 사용해도 되는가?
//         GET, HEAD, POST, PATCH 캐시 가능
//         실제로는 GET, HEAD 정도만 캐시로 사용
//             GET은 URI만 키로 잡고 캐시할 수 있지만
//             POST, PATCH는 본문 내용까지 캐시 키로 고려해야 하는데, 구현이 쉽지 않음

// HTTP 메서드 활용
//     클라이언트에서 서버로 데이터 전송
//         데이터 전송 방식
//         1. 쿼리 파라미터를 통한 데이터 전송
//             GET, 정렬 필터(검색어)
//         2. 메시지 바디를 통한 데이터 전송
//             POST, PUT, PATCH
//             회원가입, 상품 주문, 리소스 등록, 리소스 변경 등

//         CASE
//             정적 데이터 조회
//                 이미지, 정적 텍스트 문서 조회 > GET 사용
//                 정적 데이터는 일반적으로 쿼리 파라미터 없이 리소스 경로로 단순하게 조회 가능

//             동적 데이터 조회
//                 쿼리파라미터 사용
//                 > 서버에서 쿼리 파라미터를 기반으로 정렬 필터해서 결과를 동적으로 생성
//                 주로 검색, 게시판 목록에서 정렬 필터(검색어) > GET 사용, GET은 쿼리 파라미터 사용해서 데이터를 전달
//                 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용

//             HTML Form 데이터 전송
//                 POST 전송 - 저장
//                     <form action="/save" method="post">
//                         <input type="text" name="username" />
//                         <input type="text" name="age" />
//                         <button type="submit">전송</button>
//                     </form>
//                     작성 후 버튼 클릭 시 웹 브라우저가 생성한 HTTP 메세지
//                     POST /save HTTP/1.1
//                     HOST: blahblah
//                     Content-Type: application/x-www-form-urlencoded

//                     username=kim&age=31

//                     application/x-www-form-urlencoded > 한글같은 값이 들어가면 인코딩되어서 전송됨

//                 GET 전송 - 조회
//                 <form action="/save" method="get">
//                     <input type="text" name="username" />
//                     <input type="text" name="age" />
//                     <button type="submit">전송</button>
//                 </form>
//                 method가 get일 경우에는 입력된 데이터가 쿼리파라미터로 전송된다
//                 GET /save?username=kim&age=31 HTTP/1.1
//                 > GET은 조회에서만 사용, 리소스 변경이 발생하는 곳에 사용하면 안됨

//                 multipart/form-data
//                     Form에서 파일 전송 시 사용 
//                     <form action="/save" method="post" enctpye='multipart/form-data'>
//                         <input type="text" name="username" />
//                         <input type="text" name="age" />
//                         <input type="file" name="file1" />
//                         <button type="submit">전송</button>
//                     </form>                

//                     multipart/form-data 메세지 바디에 넣는 데이터 형태
//                     > 주로 바이너리 데이터 전송 시 사용

//                     POST /save HTTP/1.1
//                     HOST: blahblah
//                     Content-Type: multipart/form-data; boundary=---XXX
//                     Content-Length: 10457

//                     ---XXX
//                     Content-Disposition: form-data; name='username'

//                     kim
//                     ---XXX
//                     Content-Disposition: form-data; name='age'

//                     30
//                     ---XXX
//                     Content-Disposition: form-data; name='file1'; filename='intro.png'
//                     Content-Type: image/png

//                     blahblahblahblahblahblahblahblah
//                     ---XXX--

//                 정리        
//                     HTML Form submit 시 POST 전송
//                         ex) 회원가입, 상품 주문, 데이터 변경
//                     Content-Type: application/x-www-form-urlencoded 사용
//                         form의 내용을 메세지 바디를 통해서 전송(key=value, 쿼리파라미터 형식)
//                         전송 데이터를 url encoding 처리
//                     HTML Form은 GET 전송도 가능
//                     Content-Type: multipart/form-data
//                         파일 업로드 같은 바이너리 데이터 전송 시 사용
//                         다른 종류의 여러 파일과 폼의 내용 함께 전송 가능
//                     HTML Form 전송은 GET, POST만 지원
            
//             HTTP API 데이터 전송
//                 서버 to 서버
//                     백엔드 시스템 통신
//                 앱 클라이언트
//                     아이폰, 안드로이드
//                 웹 클라이언트
//                     HTML에서 Form 전송 대신 자바스크립트를 통한 통신에 사용(AJAX)
//                     POST, PUT, PATCH : 메세지 바디를 통해 데이터 전송
//                     GET : 조회, 쿼리파라미터로 데이터 전달
//                     Content-Type: application/json을 주로 사용

//     HTTP API 설계 예시
//         HTTP API - 컬렉션
//             POST 기반 등록
//                 회원 목록 /members > GET
//                 회원 등록 /members > POST
//                 회원 조회 /members/{id} > GET
//                 회원 수정 /members/{id} > PATCH, PUT, POST
//                 회원 삭제 /members/{id} > DELETE

//                 클라이언트는 등록될 리스소의 URI를 모른다
//                 서버가 새로 등록된 리소스 URI를 생성해준다
//                 컬렉션 > 서버가 관리하는 리소스 디렉토리
//                         서버가 리소스의 URI를 생성하고 관리
//                         여기서 컬렉션은 /members

//             PUT 기반 등록
//                 파일 목록 /files > GET
//                 파일 조회 /files/{filename} > GET
//                 파일 등록 /files/{filename} > PUT > 클라이언트가 파일이름을 알기 때문에 입력할 수 있다
//                                                     기존 파일이 있으면 지우고 대체한다 없으면 새로 만든다
//                 파일 삭제 /files/{filename} > DELETE
//                 파일 대량 등록 /files > POST

//                 클라이언트가 리소스 URI를 알고 있어야 한다
//                 클라이언트가 직접 리소스의 URI를 지정한다
//                 소토어 > 클라이언트가 관리하는 리소스 저장소
//                         클라이언트가 리소스의 URI를 알고 관리
//                         여기서 스토어는 /files
    
//         HTML FORM 사용
//             HTML FORM은 GET, POST만 지원 > 제약이 존재
//             단, AJAX 같은 기술을 사용해서 해결 가능

//             회원 목록 /members > GET
//             회원 등록 폼 /members/new > GET
//             회원 등록 /members/new, /members > POST
//             > 등록 폼과 등록 URI를 동일하게 사용할 수 있고, 안 할 수도 있다

//             회원 조회 /members/{id} > GET
//             회원 수정 폼 /members/{id}/edit > GET
//             회원 수정 /members/{id}/edit, /members/{id} > POST
//             회원 삭제 /members/{id}/delete > POST

//             컨트롤 URI
//                 GET, POST만 지원하므로 제약이 있음
//                 이런 제약을 해결하기위해 동사로 된 리소스 경로 사용
//                 POST의 /new /edit /delete가 컨트롤 URI
//                 HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)

//     참고하면 좋은 URI 설계 개념
//         문서(document)
//             단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)
//             ex) /memebers/100, /files/star.png

//         컬렉션(collection)
//             서버가 관리하는 리소스 디렉토리
//             서버가 리소스의 URI를 생성하고 관리
//             ex) /members
        
//         스토어(store)
//             클라이언트가 관리하는 자원 저장소
//             클라이언트가 리소스의 URI를 알고 관리

//         컨트롤러, 컨트롤 URI
//             문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
//             동사를 직접 사용
//             ex) /members/{id}/delete