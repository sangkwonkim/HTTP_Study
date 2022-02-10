// 1.PORT
//     같은 IP 내에서 프로세스 구분
//     하나의 클라이언트 PC가 여러가지 서버와 통신을 할 경우,
//     클라이언트에 많은 패킷이 올 때, 애플리케이션 별 패킷의 구분은 어떻게 이루어지나?
//     TCP/IP 패킷에서 IP는 IP 패킷에, PORT는 TCP 세그먼트에 담겨 있는데
//     IP는 목적지를 찾는 것, 애플리케이션을 구분하는 것이 PORT

//     0 ~ 65535 할당 가능
//     0 ~ 1023 잘 알려진 포트, 사용하지 않는 것이 좋음
//     FTP - 20, 21
//     TELNET - 23
//     HTTP - 80
//     HTTPS - 443

// 2. DNS
//     도메인 네임 시스템(Domain Name System)
//     IP는 길어서 기억하는 거도 어렵고, 변경도 가능하기 때문에 접근이 어렵다
//     DNS 서버에 도메인과 IP가 전화번호부처럼 저장되어 있다
//     클라이언트가 도메인 명으로 접근하게 되면 DNS 서버에서 해당 IP로 응답을 해준다
//     해당 IP로 접속 가능하다

// URI
//     Uniform Resource Identifier 리소스 식별 방법
//     URI는 위치(Locator), 이름(Name) 또는 둘 다 추가로 분류될 수 있다
//     > URI 안에 URL, URN이 포함 되어있다

//     URL(Resource Locator) 리소스가 있는 위치를 지정
//     URN(Resource Name) 리소스에 이름을 부여 (urn:example:animal:ferret:nose)
//         위치는 변경될 수 있지만, 이름은 변경되지 않는다
//         URN 이름만으로 실제 리소스를 찾는 방법이 보편화 되지 않음

//     https://www.google.com/search?q=hello&hl=ko
//     (프로토콜) (호스트명)   (path) (쿼리 파라미터)
//     scheme://[userInfo@]host[:port][/path][?query][#fragment]
//     scheme > 프로토콜 사용
//         프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙
//         http, https, ftp 등등
//         http는 80 포트, https는 443 포트 주로 사용하며, 생략 가능하다
//     userInfo
//         URL에 사용자 정보를 포함해서 인증 단, 거의 사용하지 않음
//     host
//         도메인명 또는 IP 주소를 직접 사용 가능
//     port
//         접속 포트, 생략 가능
//     path
//         리소스 경로, 계층적 구조
//     query
//         key value 형태
//         ? 시작, &로 추가 가능
//     fragment
//         html 내부 북마크 등에 사용
//         서버에 전송하는 정보는 아님

// 웹 브라우저 요청 흐름
//     https://www.google.com/search?q=hello&hl=ko 
//     1. 웹 브라우저가 HTTP 메세지 생성
//     ex ) GET /search?q=hello&hl=ko HTTP/1.1
//          HOST: www.google.com
//     2. SOCKET 라이브러리를 통해 전달
//     A : TCP/IP 연결(3 way handshake)
//     B: 데이터 전달

//     3. TCP/IP 패킷 생성, HTTP 메세지 포함
//     4. LAN을 통해서 서버로 전달
//     5. 서버에서 응답 메세지 작성 및 전송
//     6. html 랜더링
    
