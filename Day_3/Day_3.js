// HTTP 기본
// 클라이언트 서버 구조
//     Request, Response 구조
//     클라이언트는 서버에 요청 보내고 응답을 대기
//     서버가 요청에 대한 결과를 만들어서 응답
// 이 구조로 인해서 클라이언트와 서버가 독립적으로 진행할 수 있다.

// 무상태 프로토콜
//     Stateless
//         서버가 클라이언트의 상태를 보존하지 않는다
//             장점 : 서버 확장성 높음(스케일 아웃 - 수평확장 유리)
//             단점 : 클라이언트 추가 데이터 전송
        
//     상태 유지 : 중간에 다른 점원으로 바뀌면 안된다
//         (중간에 다른 점원으로 바뀔 때 상태 정보를 다른 점원에게 미리 알려줘야 한다)
//         항상 같은 서버가 유지 되어야 한다
//          > 클라이언트의 정보가 유지되어야 하기 때문에 특정 서버와의 통신만 가능해진다
//            해당 서버가 에러나면 모든 절차를 다시 진행해야 한다
//     무상태 : 중간에 다른 점원으로 바뀌어도 된다
//         클라이언트가 요청할 때 필요한 데이터를 전부 담아서 보낸다
//         갑자기 클라이언트 요청이 증가해도 서버를 대거 투입할 수 있다
//         무상태는 응답 서버를 쉽게 바꿀 수 있다 => 무한한 서버 증설 가능
//         > 통신하던 서버에 에러가 나도 필요한 정보는 항상 오기 때문에 다른 서버가 대체 가능하다
//     한계 : 모든 것을 무상태로 설계할 수 있는 경우도 있고 없는 경우도 있다
//             > 로그인은 상태가 유지 되어야 한다
//            전송하는 데이터양이 많다
    
//     최대한 무상태로 설계하고 꼭 필요할 때만 상태를 유지한다

// 비연결성
//     Connectionless
//     서버가 클라이언트와의 연결을 유지하지 않는다. 최소한의 자원으로 서버를 운영할 수 있다
//         HTTP는 기본적으로 연결을 유지하지 않는 모델
//         일반적으로 초 단위 이하의 빠른 속도로 응답
//         1시간동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이하로 매우 작음
//         서버 자원을 매우 효율적으로 사용할 수 있음
//     한계 : TCP/IP 연결을 새로 맺어야 함 - 3 way handshake 시간 추가
//            웹브라우저로 사이트를 요청하며 HTML 뿐만 아니라 CSS, 이미지, 자바스크립트 등 수 많은 자원이 함께 다운로드
//     HTTP 지속 연결(Persistent Connection)로 문제 해결

// HTTP 메세지
//     HTTP로 HTML, TEXT, 이미지, 음성, 영상, 파일 등 다 보낼 수 있다
//     구조
//         start-line
//         header 
//         empty line
//         message body
    
//     start-line
//     requestLine or statusLine
//         요청 메세지(requestline) > HTTP-method request-target(절대경로) HTTP-version
//         응답 메세지(statusline) > HTTP-version statusCode reason-phrase
//     header
//         fieldName : OWS fieldValue OWS (OWS 띄어쓰기 허용)
//         fieldName는 대소문자 구문 없음
//         용도 : HTTP 전송에 필요한 모든 부가정보
//         ex) 메세지 바디의 내용, 크기, 압축, 인증, 클라이언트 정보, 서버 애플리케이션 정보, 캐시 관리 정보 등등
//     message body
//         실제 전송할 데이터        

// HTTP 메서드
//     HTTP API
//         좋은 URI 설계
//         가장 중요한 것은 리소스 식별!
//             회원이라는 개념 자체가 바로 리소스이다
//             회원 등록, 수정, 조회는 리소스가 아니다
//         회원 등록, 수정, 조회는 배제한다
//         회원이라는 리소스만 식별 > 회원 리소스를 URI에 매핑
    
//     URI는 리소스만 식별 > 리소스를 대상으로 하는 행위는 분리!

//     GET: 리소스 조회
//         서버에 전달하고 싶은 데이터는 쿼리를 통해 전달
//         메세지 바디를 사용해서 데이터를 전달할 수 있지만, 지원하지 않는 곳이 많아서 권장하지 않음
    
//     POST : 요청 데이터 처리, 주로 등록에 사용
//         메시지 바디를 통해 서버로 요청 데이터 전달
//         서버는 요청 데이터를 처리
//         메세지 바디를 통해 들어온 데이터를 처리하는 모든 기능을 수행한다
//         주로 전달된 데이터로 신규 리소스 등록, 프로세스 처리에 사용
//         201 Created는 Location으로 자원생성 URI 경로 보내준다

//         POST 메소드는 대상 리소스가 리소스의 고유한 의미 체계에 따라 요청에 포함된 표현을 처리하도록 요청합니다
//         > 이 리소스 URI에 POST 요청이 오면 데이터를 어떻게 처리할지 리소스마다 따로 정해야 함 > 정해진 것이 없다
//         1. 새 리소스 생성
//         2. 요청 데이터 처리
//             단순히 생성하거나 변경하는 것을 넘어서 프로세스를 처리하는 경우(결제 > 배달시작 > 배달완료처럼 단순히 값 변경을 넘어 프로세스의 상태가 변경되는 경우)
//             POST의 결과로 새로운 리소스가 생성되지 않을 수도 있음
//             ex) POST /orders/{orderId}/start-delivery(컨트롤 URI > 리소스 단위로만 처리하기 어려울 경우 사용할 수 있다)
//         3. 다른 메서드로 처리하기 애매한 경우
//            조회할 때는 GET이 유리하다 POST는 캐싱이 어렵다

//     PUT : 리소스를 완전히 대체, 해당 리소스가 없으면 생성
//         쉽게 이야기해서 리소스를 덮어버림
//         클라이언트가 리소스를 식별한다 리소스 위치를 알고 URI를 지정한다
//         > POST는 리소스의 위치를 식별할 수 없다
//         PUT /members/100 HTTP1.1 
//         > 이처럼 PUT은 리소스를 식별해서 요청을 보내고
//         해당 식별된 리소스가 있다면 대체되고,
//         리소스가 없으면 신규 리소스가 생성된다

//         요청 리소스에 기존 리소스의 정보 일부만 있을 경우,
//         PUT은 완전 대체를 하기 때문에 요청 리소스의 내용으로만 대체된다

//     PATCH : 리소스 부분 변경
//         PUT의 완전 대체와는 다르게 기존 리소스의 부분적인 데이터만 요청 보내면 요청 리소스에 있는 값만 기존 리소스에서 변경된다
//         PATCH를 지원하지 않는 서버의 경우, POST를 사용하면 된다

//     DELETE : 리소스 삭제
//     HEAD : GET과 동일하지만 메시지 부분을 제외하고, 상태줄과 헤더만 반환
//     OPTIONS : 대상 리소스에 대한 통신 가능 옵션을 설명(CORS)
//     CONNECT : 대상 자원으로 식별되는 서버에 대한 터널을 설정
//     TRACE : 대상 리소스에 대한 경로를 따라 메세지 루프백 테스트를 수행