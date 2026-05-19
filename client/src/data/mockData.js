export const courseData = [
  {
    "weekId": "w1",
    "weekTitle": "Week 1: Foundations of Web Development",
    "days": [
      {
        "dayId": "w1-d0",
        "dayTitle": "Prerequisite Day: Fundamentals",
        "topics": [
          {
            "id": "w1-d0-t1",
            "title": "1. Introduction to Web Development",
            "explanation": "Web development refers to the building, creating, and maintaining of websites. It includes everything from a simple single static page of plain text to complex web applications. Websites work through a communication loop between a Client (like Google Chrome) and a Server (where website data is stored). Web applications are critical today because they power modern businesses, social connectivity, e-commerce, and global communication.",
            "customComponent": "WebFundamentalsVisualizer",
            "howItWorks": "Web development works via the client-server model. A client (browser) requests resources, the request travels across networks via HTTP, the web server processes it, fetches data, and sends back HTML, CSS, and JS files which the browser compiles into a visual interface.",
            "dataHandling": "Data is packaged into HTTP request packets (headers + body), routed through network hops, parsed by the server engine into structured objects, query-processed, and sent back as parsed BSON/JSON/HTML payload streams.",
            "whatIfMissing": "Without web development, websites would remain static plain-text documents with zero user engagement, no databases, no modern SaaS apps, and no online commerce or real-time connectivity.",
            "advantages": [
              "Enables global communication and information dissemination.",
              "Powers modern e-commerce, cloud software, and digital businesses.",
              "Provides accessible, interactive platform-agnostic applications."
            ],
            "realWorldExample": "Accessing https://google.com sends an instant HTTP query, routes it to Google servers, queries a search index, and sends back a rich visual portal of links in under 200ms."
          },
          {
            "id": "w1-d0-t2",
            "title": "2. Types of Web Development",
            "explanation": "Web development is generally divided into three main roles: Frontend, Backend, and Full Stack. Frontend focuses on what users see and interact with. Backend manages the servers, databases, and APIs running behind the scenes. Full Stack is the mastery of both client-side and server-side development, allowing a single developer to build complete, functional web applications from scratch.",
            "customComponent": "WebFundamentalsVisualizer",
            "howItWorks": "Web development is segmented based on execution layers. Frontend development runs client-side inside the user's browser; Backend development executes server-side on remote machines; Full Stack connects both ends into a cohesive pipeline.",
            "dataHandling": "The Frontend formats inputs and handles user triggers; the Backend validates, filters, and saves state to storage; the Full Stack architect designs the schemas and API contracts connecting both environments.",
            "whatIfMissing": "Without distinct development types, specialization would collapse, leading to bloated monolithic architectures where simple design changes could break backend server routines.",
            "advantages": [
              "Enables modular development and high specialization.",
              "Improves codebase maintenance and scalability.",
              "Accelerates deployment cycles using separated micro-services."
            ],
            "realWorldExample": "When booking a flight, the Frontend renders the interactive seat map selection, the Backend checks flight seat availability in the database, and a Full Stack engineer ensures the entire seat selection api syncs flawlessly."
          },
          {
            "id": "w1-d0-t3",
            "title": "3. Frontend Development",
            "explanation": "Frontend development, also known as client-side development, is the practice of producing HTML, CSS, and JavaScript for a website or Web Application so that a user can see and interact with them directly. HTML provides the structural skeleton, CSS styles the visual presentation, and JavaScript implements complex animations, logic, and dynamic user interactions.",
            "customComponent": "WebFundamentalsVisualizer",
            "howItWorks": "Frontend code is parsed and rendered entirely inside the user's browser. HTML builds the DOM tree, CSS computes structural layout styles (like flexbox and grid), and JS registers event listeners to update the DOM dynamically.",
            "dataHandling": "Data is held in the browser's local memory (State, LocalStorage), gathered via form inputs, validated locally, and passed to server APIs as JSON payloads.",
            "whatIfMissing": "Without frontend development, websites would have no styling or user interface, rendering raw markup text that looks like a basic notepad document.",
            "advantages": [
              "Creates responsive, visually stunning layouts.",
              "Ensures highly accessible user interfaces across devices.",
              "Offloads basic validation and rendering tasks to the client."
            ],
            "realWorldExample": "Hovering over a sign-in button changes its color smoothly via CSS transition, and clicking it triggers a JavaScript form validator before sending details to the server."
          },
          {
            "id": "w1-d0-t4",
            "title": "4. Backend Development",
            "explanation": "Backend development, also known as server-side development, focuses on database interactions, user authentication, business logic, and API configurations. While frontend developers build the visual user interface, backend developers write the clean code that powers the databases (like MongoDB, PostgreSQL) and servers (like Express, Node.js) that make the application functional and secure.",
            "customComponent": "WebFundamentalsVisualizer",
            "howItWorks": "The backend server listens on a network port for incoming API requests, authenticates and validates payloads, triggers application business logic, queries database servers, and builds response payloads.",
            "dataHandling": "Receives request payloads (JSON/BSON), sanitizes fields to prevent script injection, processes queries (CRUD), encrypts sensitive records, and writes to hard drive databases.",
            "whatIfMissing": "Without backend development, there would be no user authentication, no databases, no persistent storage, and no way to save progress or secure user accounts.",
            "advantages": [
              "Enables central security, data persistence, and integrity.",
              "Handles heavy computational workloads off user devices.",
              "Secures API credentials and databases behind corporate firewalls."
            ],
            "realWorldExample": "Submitting a password hash during login; the backend queries the database for the matching email, compares hashes, and returns a secure JWT login token."
          },
          {
            "id": "w1-d0-t5",
            "title": "5. Full Stack Development",
            "explanation": "Full Stack development refers to the comprehensive development of both the frontend (client-side) and backend (server-side) portions of an application. A Full Stack developer has a versatile understanding of styling databases, API integrations, server configurations, and user experience, enabling them to oversee a project from concept to final deployment.",
            "customComponent": "WebFundamentalsVisualizer",
            "howItWorks": "Full Stack integration involves building client interfaces that make asynchronous network calls (AJAX/Fetch) to server endpoints, which process the request via business logic routines and write/read from database schemas.",
            "dataHandling": "Full Stack engineers ensure JSON/BSON data structures map perfectly from the React frontend states, down through Express controllers, into MongoDB document schemas.",
            "whatIfMissing": "Without full-stack architectures, frontends and backends would operate in disconnected silos, causing frequent API contract breaking and integration mismatch failures.",
            "advantages": [
              "Creates highly unified, robust end-to-end applications.",
              "Saves engineering overhead and streamlines integration.",
              "Provides full visibility across database schemas and user views."
            ],
            "realWorldExample": "Creating a modern chat platform where user inputs immediately update the browser state, emit socket payloads, write records to MongoDB, and broadcast to the recipient."
          },
          {
            "id": "w1-d0-t6",
            "title": "6. What is a Network?",
            "explanation": "A network consists of two or more computers or devices connected together to share resources (such as printers and internet connections), exchange files, or allow electronic communications. Devices on a network communicate using established protocols (rules) to transmit data packets reliably over wired or wireless connections.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "Devices on a network are connected via physical wiring (fiber, ethernet) or wireless waves (WiFi, cellular). They share resource links and address locations to pack, route, and deliver digitized data blocks.",
            "dataHandling": "Data is split into small TCP/IP packet segments, stamped with source and destination IP addresses, and routed through switches and routers to be reassembled at the destination.",
            "whatIfMissing": "Without networks, every computer would act as an isolated offline terminal, requiring physical thumb drives to transfer simple files between machines.",
            "advantages": [
              "Facilitates lightning-fast, global digital communication.",
              "Enables remote computing and database storage access.",
              "Permits resource sharing, reducing hardware infrastructure costs."
            ],
            "realWorldExample": "Connecting your office computer, phone, and printer to the local Wi-Fi router to share files and print worksheets without plugging in wires."
          },
          {
            "id": "w1-d0-t7",
            "title": "7. Types of Networks",
            "explanation": "Networks are classified based on their geographical scale. The main types include PAN (Personal Area Network) for personal devices, LAN (Local Area Network) for local environments like a home or school, MAN (Metropolitan Area Network) for city-wide coverage, and WAN (Wide Area Network) for massive, global communication systems like the Internet.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "Networks are engineered to cover varying geographic sizes. PAN handles personal Bluetooth range; LAN manages local buildings; MAN handles metropolitan hubs; WAN spans oceans to link continents globally.",
            "dataHandling": "PAN routes direct wireless frames; LAN uses local switches and MAC address broadcasting; MAN leverages local fiber rings; WAN relies on massive internet backbones and routers.",
            "whatIfMissing": "Without distinct network types, network routing would be extremely inefficient, as local pings would have to hop across global satellite nodes unnecessarily.",
            "advantages": [
              "Optimizes router bandwidth and geographical routing.",
              "Enforces secure subnet bounds for personal vs corporate nodes.",
              "Improves structural redundancy and overall uptime."
            ],
            "realWorldExample": "Using a Bluetooth headset (PAN) while connected to school Wi-Fi (LAN) to access a global server hosted on AWS in another country (WAN)."
          },
          {
            "id": "w1-d0-t8",
            "title": "8. PAN (Personal Area Network)",
            "explanation": "A Personal Area Network (PAN) is the smallest network, centered around a single person in a single location. It typically has a range of less than 10 meters (33 feet). Common examples include Bluetooth pairings between your smartphone and wireless headphones, or a personal Wi-Fi hotspot sharing cellular data with a laptop.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A PAN connects close-proximity personal devices using low-power wireless frequencies like Bluetooth or Wi-Fi hotspots, typically covering a 10-meter workspace circle.",
            "dataHandling": "Data is transmitted as short-range wireless electromagnetic packets, verified using device pairings to prevent snooping by nearby hardware.",
            "whatIfMissing": "Without PANs, you would need physical wires for every peripheral—headphones, mice, smartwatches, and local file sharing.",
            "advantages": [
              "Extremely low power consumption, saving device battery.",
              "Requires zero cables or physical connecting interfaces.",
              "Highly secure due to short physical range and pairing locks."
            ],
            "realWorldExample": "Your smart watch syncing your heart rate data to your phone automatically via a secure Bluetooth Personal Area Network."
          },
          {
            "id": "w1-d0-t9",
            "title": "9. LAN (Local Area Network)",
            "explanation": "A Local Area Network (LAN) connects computers and devices within a limited geographical area, such as a single room, home, office building, or school. LANs are characterized by high data-transfer rates, small geographical scope, and lack of need for leased telecommunication lines. WiFi and Ethernet are standard LAN technologies.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A LAN connects local nodes (laptops, servers, printers) within a small building using a centralized Wi-Fi access point or high-speed Ethernet switch, bypassing public internet routes.",
            "dataHandling": "Data packets are routed locally using MAC (Media Access Control) addresses and local IP addresses assigned by the local router's DHCP server.",
            "whatIfMissing": "Without LANs, printing a document or sharing a file in an office would require uploading it to the public cloud first, slowing speeds dramatically.",
            "advantages": [
              "Blazing fast data transfer speeds (up to 10Gbps+).",
              "High security since local traffic can be kept off public lines.",
              "Cost-effective resource sharing of central servers and drives."
            ],
            "realWorldExample": "A computer lab at school where all student computers are linked via Ethernet cables to access a shared local school storage folder."
          },
          {
            "id": "w1-d0-t10",
            "title": "10. MAN (Metropolitan Area Network)",
            "explanation": "A Metropolitan Area Network (MAN) is a high-speed network that covers a larger geographic area than a LAN but is smaller than a WAN—typically spanning a town or city. It connects multiple local area networks (LANs) together. A classic real-world example is a city-wide cable television network or a university campus network.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A MAN links multiple local area networks (LANs) across a town or city using high-performance fiber optic backbones managed by local telecom providers.",
            "dataHandling": "Aggregates LAN packets at city gateway routers and transmits them across high-capacity municipal fiber rings connecting branch nodes.",
            "whatIfMissing": "Without MANs, school districts or city halls would have to pay expensive commercial WAN internet providers to route data across local offices.",
            "advantages": [
              "Extremely efficient city-wide data aggregation and routing.",
              "Provides municipal control and highly stable fiber links.",
              "Faster and cheaper than relying solely on global WAN lines."
            ],
            "realWorldExample": "A university campus network linking the libraries, athletic centers, and dormitories across different city sectors."
          },
          {
            "id": "w1-d0-t11",
            "title": "11. WAN (Wide Area Network)",
            "explanation": "A Wide Area Network (WAN) is a large information network that is not tied to a single location. WANs can facilitate communication, sharing of information, and much more between devices from around the world through a provider. The Internet itself is the largest and most famous example of a public WAN.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A WAN connects geographically separated networks across states or countries using submarine cables, satellite arrays, and transcontinental fiber optics.",
            "dataHandling": "Uses complex packet-switching routers and global routing protocols (like BGP) to route packets dynamically across hundreds of router hops globally.",
            "whatIfMissing": "Without WANs, the internet could not exist, and communication across cities or countries would be restricted to phone calls and postal mail.",
            "advantages": [
              "Enables global digital access, trade, and communication.",
              "Provides massive geographical redundancy for server storage.",
              "Connects remote offices to central corporate servers instantly."
            ],
            "realWorldExample": "An office branch in Tokyo pulling files from the corporate headquarters server located in New York City over a private WAN."
          },
          {
            "id": "w1-d0-t12",
            "title": "12. Internet",
            "explanation": "The Internet is a global network of billions of computers and other electronic devices. Through it, it is possible to access almost any information, communicate with anyone else in the world, and do much more. It works by using a standardized suite of protocols (TCP/IP) to route packets of data between networks globally.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "The Internet is a cooperative global mesh of independent networks connected via standardized gateway routers using the TCP/IP protocol suite to route packets worldwide.",
            "dataHandling": "Data is broken into standardized TCP packets, encapsulated in IP envelopes, dynamically routed across global ISP networks, and reassembled at the target.",
            "whatIfMissing": "Without the Internet, global business, remote work, online learning, cloud software, and immediate digital communication would completely vanish.",
            "advantages": [
              "Unprecedented global access to the entirety of human knowledge.",
              "Immediate, zero-cost communication across the planet.",
              "Powers global economies, e-commerce, and software services."
            ],
            "realWorldExample": "Searching for a recipe on a server in Italy, reading it on a tablet in India, and sharing it to a chat group in California in milliseconds."
          },
          {
            "id": "w1-d0-t13",
            "title": "13. Client-Server Architecture",
            "explanation": "Client-Server architecture is a distributed application structure that partitions tasks or workloads between the providers of a resource or service, called servers, and service requesters, called clients. In web development, your browser acts as the Client (making requests), and the backend server processes and fulfills those requests.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A Client (like Chrome) sends a structured request over the network. The Server (like Express) processes the request, performs queries on a Database, and returns a response.",
            "dataHandling": "Strict split of concerns: the client manages user state and visual layout; the server manages validation and APIs; the database handles storage tables.",
            "whatIfMissing": "Without Client-Server architectures, every website would have to download the entire database to the user's phone to load a simple search page.",
            "advantages": [
              "Centralized data security, management, and backups.",
              "Offloads storage and processing workloads from user devices.",
              "Allows developers to update database logic without updating the client."
            ],
            "realWorldExample": "Searching for a video on YouTube; your phone (Client) sends a search string to YouTube (Server), which queries a video index database and returns matches."
          },
          {
            "id": "w1-d0-t14",
            "title": "14. What is a Protocol?",
            "explanation": "A protocol is a standardized set of rules that governs how data is transmitted and processed between different devices on a network. Just as humans speak different languages to communicate, computers use protocols to establish connection methods, packet formats, error checking, and data compression guidelines.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "Network protocols define a strict set of rules, formats, and handshakes that devices must follow to communicate, ensuring diverse hardware can exchange data seamlessly.",
            "dataHandling": "Enforces packet headers, payload bounds, character encoding standardizations, error-checking checksums, and compression formats.",
            "whatIfMissing": "Without protocols, computers would transmit raw binary noise that other devices could not parse, making network communication impossible.",
            "advantages": [
              "Enables universal compatibility across different operating systems.",
              "Guarantees data integrity using error checking and handshakes.",
              "Optimizes data throughput using compression rules."
            ],
            "realWorldExample": "A Windows laptop, an Apple iPhone, and a Linux server sharing files perfectly because they all follow standard Wi-Fi and TCP/IP protocols."
          },
          {
            "id": "w1-d0-t15",
            "title": "15. HTTP",
            "explanation": "HTTP stands for HyperText Transfer Protocol. It is the foundational protocol used by the World Wide Web to define how messages are formatted and transmitted, and what actions web servers and browsers should take in response to various commands. It operates on a simple, stateless request-response cycle.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "HTTP operates on a stateless Request-Response cycle. The client sends a GET/POST request over TCP, the server processes it, and returns an HTTP status code (like 200 OK) and a payload.",
            "dataHandling": "Data is sent as plain text strings containing request headers (user-agent, content-type) and a body payload, making it simple to parse but open to sniffing.",
            "whatIfMissing": "Without HTTP, there would be no World Wide Web, and accessing website pages would require custom socket programming for every portal.",
            "advantages": [
              "Stateless, fast, and highly scalable for billions of servers.",
              "Standardized methods (GET, POST, PUT, DELETE) map to CRUD.",
              "Extremely easy to parse and integrate across frontends."
            ],
            "realWorldExample": "Entering a URL in your address bar; your browser sends an HTTP GET request and receives an HTML file representing the homepage in response."
          },
          {
            "id": "w1-d0-t16",
            "title": "16. HTTPS",
            "explanation": "HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP. It encrypts all communication between the browser and the server using SSL/TLS (Secure Sockets Layer/Transport Layer Security) protocols. This prevents malicious third parties from eavesdropping, intercepting, or tampering with sensitive user data like credit card info or passwords.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "HTTPS runs standard HTTP inside an encrypted cryptographic tunnel established using an SSL/TLS handshake. Public keys encrypt data, and private keys decrypt it.",
            "dataHandling": "All HTTP headers, URLs, cookies, and body payloads are scrambled into secure ciphertext before leaving the device network card.",
            "whatIfMissing": "Without HTTPS, any password, credit card, or personal message sent online could be intercepted and stolen by anyone on the same Wi-Fi router.",
            "advantages": [
              "Guarantees end-to-end data encryption and privacy.",
              "Verifies website identity using official trusted CA certificates.",
              "Boosts SEO search result rankings, as search engines favor secure sites."
            ],
            "realWorldExample": "Shopping on Amazon; HTTPS encrypts your credit card number, ensuring hacker sniffing tools on public cafe Wi-Fi only see gibberish."
          },
          {
            "id": "w1-d0-t17",
            "title": "17. TCP",
            "explanation": "TCP (Transmission Control Protocol) is one of the main protocols of the Internet protocol suite. It sits on top of the IP protocol and guarantees the reliable, ordered, and error-checked delivery of a stream of octets (bytes) between applications running on hosts communicating over an IP network.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "TCP establishes a reliable, bidirectional, connection-oriented channel using a 3-Way Handshake. It numbers every packet, tracks delivery, and resends missing blocks.",
            "dataHandling": "Splits raw streams into numbered TCP segments, checks packet integrity using checksums, and rearranges out-of-order packets at the receiver.",
            "whatIfMissing": "Without TCP, files downloaded online would arrive corrupted, images would have missing lines, and code files would fail to compile.",
            "advantages": [
              "Guarantees 100% reliable, error-checked, and complete data delivery.",
              "Enforces order-guaranteed reassembly of data packets.",
              "Prevents network congestion using dynamic flow-control sizing."
            ],
            "realWorldExample": "Downloading a ZIP file; TCP ensures every single byte is received in the exact order, allowing the file to extract without corruption."
          },
          {
            "id": "w1-d0-t18",
            "title": "18. IP",
            "explanation": "IP (Internet Protocol) is the primary network protocol used to route data packets across the internet. Every device connected to the internet is assigned a unique IP address, which allows routers and servers to identify where data packets originate and ensure they are delivered to the correct destination.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "IP is a connectionless, best-effort network protocol responsible for addressing and routing individual envelopes of data (IP packets) across global networks.",
            "dataHandling": "Wraps TCP segments in IP packets stamped with the source IP, destination IP, and a Time-To-Live (TTL) hop count limit.",
            "whatIfMissing": "Without IP, routers would not know where to direct network data, and packets would circle the internet forever without finding their destination.",
            "advantages": [
              "Provides a standardized, unique addressing system for every device.",
              "Highly flexible routing dynamically bypasses offline network nodes.",
              "Enables universal packet encapsulation across diverse network cables."
            ],
            "realWorldExample": "Your router analyzing an incoming packet's destination IP to decide whether to forward it to your phone or your smart television."
          },
          {
            "id": "w1-d0-t19",
            "title": "19. DNS",
            "explanation": "DNS (Domain Name System) acts as the phonebook of the internet. Since humans prefer to remember names like google.com instead of numerical IP addresses like 142.250.190.46, DNS servers translate friendly domain names entered into the browser s address bar into the numerical IP addresses that computers use to find each other.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "When you enter a domain, the DNS resolver queries Root, TLD, and Authoritative DNS servers in a hierarchical chain to locate and return the server's numerical IP address.",
            "dataHandling": "Translates domain string inputs into numerical IPv4/IPv6 address strings, utilizing high-speed UDP queries and caching for fast retrieval.",
            "whatIfMissing": "Without DNS, you would have to memorize and enter numerical IP addresses (like 172.217.16.142) instead of writing friendly domains like google.com.",
            "advantages": [
              "Replaces complex numbers with easy-to-remember domain names.",
              "Allows companies to change server IP addresses without changing URLs.",
              "Enables global server load balancing using dynamic DNS routing."
            ],
            "realWorldExample": "Typing wemadelogix.com in Chrome; DNS resolves it to 104.244.42.1, letting your browser connect to the server backend instantly."
          },
          {
            "id": "w1-d0-t20",
            "title": "20. FTP",
            "explanation": "FTP (File Transfer Protocol) is a standard network protocol used for the transfer of computer files between a client and server on a computer network. It is commonly used by developers to upload web page files, assets, and databases from local machines to hosting servers.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "FTP establishes separate connections for command instructions (port 21) and active file data transfer (port 20), allowing stable, raw file transmission.",
            "dataHandling": "Transmits binary or plain-text files directly over dedicated TCP channels, supporting bulk file uploads and directory browsing controls.",
            "whatIfMissing": "Without FTP, developers would have to copy files to server drives manually, or build custom HTTP upload utilities for simple file migrations.",
            "advantages": [
              "Highly optimized for massive bulk file uploads and downloads.",
              "Supports connection resuming if network links drop mid-transfer.",
              "Enforces secure file permissions and user-account access controls."
            ],
            "realWorldExample": "An engineer uploading a folder of 5,000 product images to a web server's assets directory using a tool like FileZilla."
          },
          {
            "id": "w1-d0-t21",
            "title": "21. SMTP",
            "explanation": "SMTP (Simple Mail Transfer Protocol) is the standard protocol used for sending and routing digital mail messages across the Internet. When you hit send on an email, your email client uses SMTP to forward the message to your mail server, which then routes it to the recipient s mail server.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "SMTP acts as a digital postal router. It transfers outbound email messages from the sender's client to mail servers, routing them to the recipient's mail server.",
            "dataHandling": "Formulates email envelopes containing headers (To, From, Subject) and parses body data (text, attachments) into plain text streams.",
            "whatIfMissing": "Without SMTP, sending emails would be limited to walled-garden platforms, preventing communication between different hosts (like Outlook to Gmail).",
            "advantages": [
              "Universal protocol enabling cross-provider email routing.",
              "Highly stable spooling queues emails if recipient servers are offline.",
              "Lightweight text-based protocol that is fast and efficient."
            ],
            "realWorldExample": "Sending a message from az@wemadelogix.com to friend@gmail.com; SMTP routes it from the company mail server to Gmail's mail server."
          },
          {
            "id": "w1-d0-t22",
            "title": "22. WebSocket",
            "explanation": "WebSocket is a computer communications protocol providing full-duplex (two-way) communication channels over a single TCP connection. Unlike HTTP s request-response model, WebSockets allow servers to push real-time data to the client instantly without the client asking, making it ideal for chat apps and live feeds.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "WebSocket begins as a standard HTTP upgrade request. Once handshake succeeds, the connection switches, keeping a persistent, bidirectional TCP pipe open.",
            "dataHandling": "Data is framed into lightweight binary or text frames sent instantly over the single open connection without HTTP header overhead.",
            "whatIfMissing": "Without WebSockets, real-time apps like chats or stock tickers would have to poll the HTTP server every second, bloating network bandwidth.",
            "advantages": [
              "Extremely low latency real-time bidirectional data transfers.",
              "Eliminates massive HTTP header overhead on frequent updates.",
              "Allows servers to push data to clients instantly without client request."
            ],
            "realWorldExample": "A multiplayer browser game where your movement updates are sent instantly to other players and their locations are pushed back in milliseconds."
          },
          {
            "id": "w1-d0-t23",
            "title": "23. What is an IP Address?",
            "explanation": "An IP (Internet Protocol) address is a unique string of characters (usually numbers separated by periods or colons) that identifies each computer or device using the Internet Protocol to communicate over a network. It serves as both a device location address and a route identifier.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "An IP address acts as a device's digital mailing address. Global routers read the IP prefix to locate the target network, and the suffix to locate the specific host.",
            "dataHandling": "Represented as IPv4 (four 8-bit octets: 192.168.1.1) or modern IPv6 (eight 16-bit hexadecimal groups: 2001:db8::ff00:42:8329).",
            "whatIfMissing": "Without IP addresses, computers would have no unique destination identities, preventing network routers from delivering data packets to the correct device.",
            "advantages": [
              "Provides a globally unique identification system for all devices.",
              "Structured hierarchy allows routers to locate devices extremely fast.",
              "Supports local subnet partitioning for secure home/office loops."
            ],
            "realWorldExample": "Your home router having the external public IP address of 84.22.105.14, identifying your specific home connection to the global internet."
          },
          {
            "id": "w1-d0-t24",
            "title": "24. Types of IP Address",
            "explanation": "IP addresses are classified based on their allocation type and network environment. The primary types are Static IP addresses (which never change and are manually configured) and Dynamic IP addresses (which are temporary and automatically assigned by network routers whenever a device connects).",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "IP addresses are allocated dynamically (temporary leases assigned automatically by a router's DHCP server) or statically (permanently assigned by an administrator).",
            "dataHandling": "DHCP servers track lease intervals and dynamic pools; Static IPs are manually bound to network cards and bypassed in the DHCP allocation loop.",
            "whatIfMissing": "Without distinct IP types, network admins would have to manually type and coordinate IP addresses for every phone and laptop connecting to WiFi.",
            "advantages": [
              "Dynamic IPs conserve massive pools of IPv4 addresses automatically.",
              "Static IPs provide highly reliable, unchanging server connections.",
              "Simplifies home setups since consumer devices work instantly."
            ],
            "realWorldExample": "Your phone gets a new dynamic IP every time you connect to cafe Wi-Fi, while Google's search server keeps a static IP so it never changes."
          },
          {
            "id": "w1-d0-t25",
            "title": "25. Static IP Address",
            "explanation": "A Static IP address is an IP address that is manually assigned to a device by an administrator and remains constant over time. Static IPs are highly reliable and are commonly used by web hosting servers, database instances, and enterprise printers so their addresses are always predictable.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A Static IP address is manually configured on a server's network card, instructing the router to reserve it permanently, guaranteeing the host address never changes.",
            "dataHandling": "The device requests the specific bound IP on connection boot, and the gateway router locks it to the device's hardware MAC address.",
            "whatIfMissing": "Without Static IPs, web servers would change addresses every time they rebooted, forcing DNS records to constantly update and causing site outages.",
            "advantages": [
              "Guarantees constant, highly predictable server connections.",
              "Ideal for hosting databases, web servers, and remote printers.",
              "Simpler routing configuration for advanced network firewalls."
            ],
            "realWorldExample": "A company database server locked to 10.0.1.200 so that all corporate backend apps can connect to it reliably every day."
          },
          {
            "id": "w1-d0-t26",
            "title": "26. Dynamic IP Address",
            "explanation": "A Dynamic IP address is an IP address that is automatically assigned to a device by a DHCP (Dynamic Host Configuration Protocol) server on a network router. These addresses are leased and can change periodically, which helps conserve available IP address pools for standard consumer devices.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "A DHCP server on the router listens for discovery broadcasts from new devices, offers an available IP from its pool, and assigns it a temporary time lease.",
            "dataHandling": "Runs the DORA process: Discover (client broadcast) -> Offer (router proposal) -> Request (client request) -> Acknowledge (router lease lock).",
            "whatIfMissing": "Without Dynamic IPs, connecting to a public Wi-Fi network would require the manager to manually assign a numeric IP to your phone.",
            "advantages": [
              "Requires zero manual setup, enabling plug-and-play Wi-Fi.",
              "Recycles inactive IP addresses back into the pool automatically.",
              "Prevents network conflicts from duplicate IP allocations."
            ],
            "realWorldExample": "Walking into Starbucks; your phone connects to Wi-Fi, silently runs DORA, and gets a temporary IP lease for your session."
          },
          {
            "id": "w1-d0-t27",
            "title": "27. What is DNS?",
            "explanation": "DNS stands for Domain Name System. It is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It plays a critical role in internet routing by mapping domain names to their underlying web servers.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "DNS operates as a distributed database. High-speed lookup servers translate alphanumeric names into numeric IPs using a cache-first hierarchical search.",
            "dataHandling": "Converts domain text queries into numeric IP addresses, storing records (A, AAAA, MX, CNAME) in lightweight structured zone files.",
            "whatIfMissing": "Without DNS, internet usability would collapse, as humans would have to write down and memorize strings of numbers to open simple web links.",
            "advantages": [
              "Replaces complex numbers with easy-to-remember domain names.",
              "Allows companies to change server IP addresses without changing URLs.",
              "Enables global server load balancing using dynamic DNS routing."
            ],
            "realWorldExample": "Typing google.com resolved instantly to 142.250.190.46, bypassing complex subnet address numbering."
          },
          {
            "id": "w1-d0-t28",
            "title": "28. Functions of DNS",
            "explanation": "The main functions of DNS are domain-to-IP resolution, mail server routing (via MX records), load balancing across multiple server instances, and providing aliasing (CNAME records). Without DNS, internet usability would collapse, as users would have to memorize long strings of numbers to access websites.",
            "customComponent": "NetworkProtocolsVisualizer",
            "howItWorks": "DNS servers use specialized resource records: A records map domains to IPv4; CNAME records create aliases; MX records route emails; NS records identify authoritative zones.",
            "dataHandling": "Coordinates zone updates, caches query resolutions locally to reduce network traffic, and balances user queries across server pools.",
            "whatIfMissing": "Without advanced DNS functions, companies could not balance web traffic across servers, and custom corporate email routing would be impossible.",
            "advantages": [
              "Decentralizes server load using round-robin DNS balances.",
              "Directs corporate emails securely using specialized MX entries.",
              "Maintains clean structural aliases using CNAME definitions."
            ],
            "realWorldExample": "An MX record mapping @wemadelogix.com emails to Microsoft Office 365 servers while the website points to Firebase hosting."
          },
          {
            "id": "w1-d0-t29",
            "title": "29. Introduction to HTML",
            "explanation": "HTML (HyperText Markup Language) is the standard markup language used to create the structure of webpages. Along with CSS and JavaScript, it forms the triad of core web technologies. Every visual layout, text passage, image embed, and form on a website starts as raw HTML elements.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HTML uses text-based markup tags to construct a tree of DOM nodes (Document Object Model). The browser parses this tree, mapping nodes to visual layout blocks.",
            "dataHandling": "Plain text files (.html) are read as character streams, tokenized into nested element nodes, and compiled into the active browser DOM tree.",
            "whatIfMissing": "Without HTML, there would be no web browser pages, as there would be no markup structure to represent headings, text paragraphs, or links.",
            "advantages": [
              "The universal, open-standard structural language of the web.",
              "Extremely lightweight, loading visual structures instantly.",
              "Highly accessible and understood by all search engine crawlers."
            ],
            "realWorldExample": "Writing <h1>My Portfolio</h1> tells the browser to instantly display that string as a primary page title."
          },
          {
            "id": "w1-d0-t30",
            "title": "30. Meaning of HTML",
            "explanation": "HTML stands for HyperText Markup Language. HyperText refers to the hyperlinks that connect webpages together. Markup refers to the tags (like <p> or <h1>) used to annotate text, telling the browser how to organize content. Language indicates the structured syntax used to communicate layout instructions to the browser.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HTML is not a logical language (no loops or math). It works by using a nested tag grammar to markup raw text, assigning semantic meaning to content.",
            "dataHandling": "Translates a nested code block into parsed structural nodes. E.g. <p>Hello</p> becomes an HTMLParagraphElement in browser memory.",
            "whatIfMissing": "Without HTML structure, browsers would treat a webpage's text as a single massive, unformatted block of continuous, running letters.",
            "advantages": [
              "Highly intuitive nested tree structure is easy to write and parse.",
              "Decouples document structure from presentation styling (CSS).",
              "Compatible with all generations of client web browsers."
            ],
            "realWorldExample": "Wrapping a phrase in <em> emphasizes it to the reader and signals screen readers to read it with a different voice tone."
          },
          {
            "id": "w1-d0-t31",
            "title": "31. What is HyperText?",
            "explanation": "HyperText is text displayed on a computer screen or other electronic device with references (hyperlinks) to other text that the reader can immediately access. It is the core concept behind the interconnected nature of the World Wide Web, allowing users to jump seamlessly between pages.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HyperText links documents globally. The browser reads the href attribute of an anchor tag and triggers a new HTTP request to load the linked resource on click.",
            "dataHandling": "The anchor node binds a click event listener that maps the target URL string to the browser's window navigation interface.",
            "whatIfMissing": "Without HyperText, the web would be a collection of isolated files. Navigating would require manually typing a new file path for every page.",
            "advantages": [
              "Creates an interconnected world-wide web of instant information.",
              "Allows seamless navigation between independent global domains.",
              "Supports deep linking directly to specific text anchors on a page."
            ],
            "realWorldExample": "Clicking a blue underlined link to jump from a Wikipedia article directly to a references source page on another site."
          },
          {
            "id": "w1-d0-t32",
            "title": "32. What is Text?",
            "explanation": "In HTML, Text represents the actual alphanumeric content, letters, words, and sentences that are wrapped inside HTML tags. While the tags themselves provide instructions and structure, the text is the primary information payload that is displayed to the user.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "Text in HTML is the physical, readable alphanumeric characters placed between opening and closing tags. It represents the primary information payload.",
            "dataHandling": "Parsed as character arrays (strings) and stored as innerText or textContent DOM properties, rendered on-screen using specified body fonts.",
            "whatIfMissing": "Without text payloads, websites would be empty layouts of blank boxes and outlines, containing no actual readable information.",
            "advantages": [
              "Highly searchable by search engine crawlers, boosting organic SEO.",
              "Extremely fast loading, requiring minimal network bandwidth.",
              "Easily translated and adjusted by browser accessibility tools."
            ],
            "realWorldExample": "The words and descriptions you are reading inside this application dashboard are raw HTML text payloads."
          },
          {
            "id": "w1-d0-t33",
            "title": "33. What is Markup?",
            "explanation": "Markup refers to the process of using special syntax tags (like <header>, <strong>, or <li>) to annotate or mark up plain text content. These tags tell the browser exactly how to interpret the semantic meaning and structural layout of the raw text inside.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "Markup uses opening tags (e.g. <b>) and closing tags (e.g. </b>) to annotate text. The parser applies specific rendering rules based on the tag identified.",
            "dataHandling": "Tokens like <p> instruct the DOM engine to instantiate specific styles, margins, and layout boxes around the text contents.",
            "whatIfMissing": "Without markup annotations, there would be no distinction between a bold page header, an italic quote, and a standard paragraph block.",
            "advantages": [
              "Simple, clean syntax that is easy for humans and machines to read.",
              "Provides semantic structure that aids screen-reader accessibility.",
              "Extremely robust; browsers ignore invalid tags instead of crashing."
            ],
            "realWorldExample": "Adding <strong>Important</strong> to the text compiles it into a bold font with strong semantic emphasis."
          },
          {
            "id": "w1-d0-t34",
            "title": "34. What is Language?",
            "explanation": "The Language in HTML describes the highly structured system of tags, attributes, and nesting rules that developers use to write web layouts. While not a logical programming language (since it lacks variables and loops), it is a standardized presentation markup language understood by all web browsers.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "As a presentation markup language, HTML uses a defined, globally standardized dictionary of tag elements that all browser rendering engines are coded to compile.",
            "dataHandling": "Coordinates with W3C web standards to ensure tag definitions (like <article> or <button>) behave identically across Safari, Chrome, and Firefox.",
            "whatIfMissing": "Without a standardized language, every browser would require its own separate markup syntax, forcing developers to build different sites for Chrome vs Safari.",
            "advantages": [
              "Ensures universal, cross-browser page layout compatibility.",
              "Open standard managed by the W3C ensures continuous modernization.",
              "Extremely easy to learn, paving the way for developers worldwide."
            ],
            "realWorldExample": "A <button> element rendering as an interactive, clickable form button on every smartphone and laptop browser on earth."
          },
          {
            "id": "w1-d0-t35",
            "title": "35. Structure of HTML Document",
            "explanation": "A valid HTML document follows a strict hierarchical tree structure. It begins with the <!DOCTYPE html> declaration, followed by the root <html> element. Inside the root are the <head> element (containing metadata, titles, and links) and the <body> element (containing the visible content).",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "The structure acts as a structural tree: DOCTYPE sets rendering rules; html is the root; head holds invisible metadata; body holds all visual content.",
            "dataHandling": "The browser builds a parent-child node layout map based on the tag nesting hierarchy. Parent elements pass down structural boundaries to child nodes.",
            "whatIfMissing": "Without a strict document structure, browsers could misinterpret metadata as page body text, causing broken rendering and SEO failures.",
            "advantages": [
              "Enforces clean code organization and modular layout builds.",
              "Ensures critical search engine metadata is parsed before body load.",
              "Enables CSS parent-child styling inheritance (Cascading)."
            ],
            "realWorldExample": "A webpage having a defined <head> containing stylesheet links, and a <body> containing the actual header navigation, images, and text cards."
          },
          {
            "id": "w1-d0-t36",
            "title": "36. Boilerplate Code",
            "explanation": "HTML Boilerplate is the standard template required to create a clean, modern, and accessible webpage. It includes the doctype, html lang attribute, head section with character encoding (UTF-8), responsive viewport tags, and the body section ready for custom layouts.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HTML Boilerplate provides a standard structural baseline. It tells the browser the character set, ensures correct mobile view sizing, and wraps elements in valid root nodes.",
            "dataHandling": "Sets structural variables like viewport configurations, character encoding parameters (UTF-8), and language bindings in browser memory.",
            "whatIfMissing": "Without boilerplate baselines, pages could load with corrupted accent characters (wrong encoding) or look extremely tiny on mobile screens.",
            "advantages": [
              "Guarantees mobile responsiveness using the meta-viewport tag.",
              "Prevents character display corruption using UTF-8 declarations.",
              "Provides a clean, standardize starting template for new web pages."
            ],
            "realWorldExample": "The standard <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> boilerplate ensuring your website fits mobile screens."
          },
          {
            "id": "w1-d0-t37",
            "title": "37. Headings",
            "explanation": "HTML headings are defined with the <h1> to <h6> tags. <h1> defines the most important heading (usually the page title), while <h6> defines the least important heading. Headings provide a structured hierarchy for screen readers and SEO crawlers, and should never be skipped.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "Headings elements (h1 to h6) instruct the parser to assign size hierarchy and semantic importance, defining structural sections of the page document.",
            "dataHandling": "Establishes a logical tree of headers. Search engines analyze h1 elements to understand the primary topic of the webpage.",
            "whatIfMissing": "Without headings, there would be no visual hierarchy on pages, and search crawlers could not determine the structural priority of texts.",
            "advantages": [
              "Enforces clear visual hierarchy and layout scannability.",
              "Significantly improves search engine index ranking (SEO).",
              "Improves accessibility navigation for screen readers."
            ],
            "realWorldExample": "Using <h1>MERN Boot Camp</h1> as the main title, and <h2>Week 1 Curriculum</h2> as the sub-section header."
          },
          {
            "id": "w1-d0-t38",
            "title": "38. Paragraphs",
            "explanation": "HTML paragraphs are defined using the <p> tag. Browsers automatically add a small amount of vertical space (margin) before and after a paragraph to ensure clean text separation. Text inside a <p> tag is automatically wrapped to fit the width of its parent container.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "The p tag wraps text passages, instructing the browser to add a standard vertical margin (1em) to separate text ideas visually.",
            "dataHandling": "Compiles text content into a block-level paragraph layout box that wraps words automatically to fit the width of the parent container.",
            "whatIfMissing": "Without paragraph tags, all text on a website would merge into one massive, unreadable block of continuous sentences.",
            "advantages": [
              "Enforces neat text spacing and paragraph separation automatically.",
              "Highly responsive text wrapping adapts to any device viewport width.",
              "Supports nested inline styling (like bold or italic text) cleanly."
            ],
            "realWorldExample": "Wrapping a blog post's thoughts in <p> tags so readers can easily scan between separate paragraphs."
          },
          {
            "id": "w1-d0-t39",
            "title": "39. Formatting Tags",
            "explanation": "HTML provides several tags for text formatting: <b> and <strong> for bold styling, <i> and <em> for italicized text, and <u> for underlined text. While <b> and <i> only apply visual styling, <strong> and <em> carry semantic emphasis which is crucial for accessibility and screen readers.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "Formatting tags apply visual changes (bold, italics) and semantic indicators. tags like strong tell screen readers to change pitch and volume to stress importance.",
            "dataHandling": "Alters font properties (font-weight, font-style) and assigns accessibility traits inside the browser's accessibility tree.",
            "whatIfMissing": "Without formatting tags, all text inside a paragraph would look identical, preventing developers from highlighting key terms or quotes.",
            "advantages": [
              "Adds micro-emphasis and visual variety to copy text.",
              "Improves reading scannability and structural layout highlight.",
              "Enriches semantic detail for screen-reader accessibility."
            ],
            "realWorldExample": "Wrapping a critical security warning in <strong>WARNING</strong> to display it in a bold font that demands user attention."
          },
          {
            "id": "w1-d0-t40",
            "title": "40. HTML Comments",
            "explanation": "HTML comments are defined using the <!-- comment content --> syntax. Comments are ignored by the web browser and do not render on the screen. They are highly useful for explaining code structure, organizing layout sections, and leaving notes for other developers.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HTML comments are identified by special opening and closing symbols. The browser's HTML compiler ignores any text placed inside these tags, bypassing DOM render.",
            "dataHandling": "The characters are completely skipped during tokenization and DOM tree creation, keeping the compiled page output free of commented text.",
            "whatIfMissing": "Without comments, developers could not document their markup structures or temporarily disable code sections during page troubleshooting.",
            "advantages": [
              "Enforces clear, inline documentation and code sectioning.",
              "Allows fast debugging by temporarily hiding layout blocks.",
              "Does not affect the compiled page size or visual rendering."
            ],
            "realWorldExample": "Writing <!-- Begin Navbar --> inside your code to help other developers locate the header section quickly."
          },
          {
            "id": "w1-d0-t41",
            "title": "41. HTML Entities",
            "explanation": "HTML Entities are special codes used to display reserved characters (like < or >) or characters not easily typed on a standard keyboard (like © or &). They begin with an ampersand (&) and end with a semicolon (;). For example, &lt; displays <, and &copy; displays ©.",
            "customComponent": "HTMLBoilerplateVisualizer",
            "howItWorks": "HTML Entities use specialized code keywords starting with an ampersand and ending with a semicolon. The parser translates these codes into special visual glyphs.",
            "dataHandling": "Intercepts entity tokens during character parsing and substitutes them with the corresponding Unicode special character glyph.",
            "whatIfMissing": "Without HTML entities, writing a less-than symbol (<) inside a paragraph would confuse the parser, making it think you are opening a new tag and breaking the page.",
            "advantages": [
              "Allows safe rendering of reserved HTML symbols like < and >.",
              "Enables easy rendering of trademark, copyright, and mathematical glyphs.",
              "Guarantees characters display correctly regardless of file encoding."
            ],
            "realWorldExample": "Using &copy; to display the copyright symbol (©) or &lt; to display a less-than sign (<) safely."
          },
          {
            "id": "w1-d0-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "Access the official prerequisite slides, networking basics infographics, and HTML fundamentals worksheets.",
            "tutorMaterial": {
              "title": "Prerequisite Lesson Plan & Guide",
              "content": "Ensure all students are familiar with basic internet architectures and can successfully open the browser inspection panel before Day 1 starts.",
              "duration": "10 mins",
              "resources": [
                "Client-Server Architecture Visual Deck (PDF)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d1",
        "dayTitle": "Day 1: HTML Foundations & Syntax",
        "topics": [
          {
            "id": "t1",
            "title": "1. The Fundamental of Web Development",
            "visualization": "/how-web-works.png",
            "customComponent": "WebFundamentalsInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "The Global Web Pipeline",
                "content": "The internet runs on a client-server relationship. Clients package requests over standard TCP/IP network routes to servers, which respond with assets."
              },
              {
                "level": "intermediate",
                "title": "Secure Protocols: HTTP vs HTTPS",
                "content": "HTTP transmits packets in clear plain text, leaving data exposed. HTTPS encrypts communication channels using robust SSL/TLS cryptographic keys."
              },
              {
                "level": "advanced",
                "title": "DNS & Dynamic IP Routing",
                "content": "All devices have unique IP addresses. The Domain Name System (DNS) operates as the web phonebook to resolve domain names to active IPs."
              }
            ],
            "detailedReference": {
              "summary": "Web development operates on a global request-response cycle built upon a highly reliable client-server architecture model. The client (browser) acts as the request initiator, while the server acts as the processing host.",
              "keyConcepts": [
                { "term": "Client-Server Dialogue", "definition": "The browser packages a structured request over network protocols to a remote host server. The server processes headers, queries databases, compiles templates, and dispatches compiled files back to the client browser." },
                { "term": "HTTP vs HTTPS Security", "definition": "HTTP dispatches data in readable plain text. HTTPS secures the communication pipeline via a robust SSL/TLS cryptographic handshake that encrypts all parameters, credentials, and payload headers." },
                { "term": "DNS Domain Mapping", "definition": "DNS acts as the directory of the internet, converting human-readable strings like 'google.com' into numeric machine-readable IPv4 or IPv6 network addresses." }
              ],
              "bestPractices": [
                "Always enforce global HTTPS redirections to prevent session hijack and credential leakage.",
                "Ensure domain configurations possess valid SSL/TLS certificates signed by recognized Certificate Authorities.",
                "Use modern DNS prefetching in head sections to optimize high-performance asset loading."
              ]
            },
            "codeTemplate": {
              "html": "<!-- Hands-on check: Dispatch a simulated request! -->\n<div id='api-log'>Terminal idle...</div>\n<button id='api-trigger'>Launch Request</button>",
              "css": "#api-log {\n  padding: 15px;\n  background: #0f172a;\n  color: #38bdf8;\n  border-radius: 8px;\n  margin-bottom: 10px;\n  font-family: monospace;\n  border: 1px solid #1e293b;\n}\nbutton {\n  background: #0ea5e9;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n}",
              "js": "document.getElementById('api-trigger').onclick = () => {\n  const log = document.getElementById('api-log');\n  log.innerText = '-> Packaging GET payload. Querying DNS...';\n  setTimeout(() => {\n    log.innerText = '-> TLS Handshake verified. Sending ciphertext...';\n  }, 1000);\n  setTimeout(() => {\n    log.innerText = '<- Status 200 OK (Secure HTTPS session active)';\n  }, 2200);\n};"
            },
            "assessment": "Summarize the primary difference between HTTP and HTTPS, explaining why TLS handshake keys protect modern websites."
          },
          {
            "id": "t2",
            "title": "2. Structure",
            "visualization": "/html-tags.png",
            "customComponent": "HTMLStructureInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Defining the DOM Tree",
                "content": "HTML uses hierarchical tag pairs to construct the Document Object Model (DOM), the structural skeleton that defines layout boxes parsed by rendering engines."
              },
              {
                "level": "intermediate",
                "title": "Nesting Constraints",
                "content": "Elements must close in symmetric, reverse-opening order (e.g. <div><p>...</p></div>). Overlapping tags causes parsing bugs and layout anomalies."
              },
              {
                "level": "advanced",
                "title": "Block vs Inline Box Models",
                "content": "Block elements stack vertically and occupy 100% width. Inline elements sit side-by-side with text blocks and only wrap their immediate content."
              }
            ],
            "detailedReference": {
              "summary": "HTML provides the visual structure of a web document by parsing text blocks into a hierarchical tree layout. The browser converts tags into interactive DOM nodes.",
              "keyConcepts": [
                { "term": "DOM Tree (Document Object Model)", "definition": "A hierarchical layout mapping the parent-child relationships of elements. Visual engines draw layers based on DOM configurations." },
                { "term": "Symmetric Nested Tags", "definition": "Elements must be fully encapsulated. A child element must close completely inside its parent boundary to prevent engine parsing errors." },
                { "term": "Display Flow Types", "definition": "Block elements start on fresh lines and fill block dimensions. Inline elements occupy text dimensions, avoiding lines breaks." }
              ],
              "bestPractices": [
                "Always close tags symmetrically to comply with standard W3C validation specifications.",
                "Adopt lowercase tag names universally to ensure clean code conventions.",
                "Verify parent-child container restrictions (e.g. nesting block tags inside inline tags breaks syntax expectations)."
              ]
            },
            "codeTemplate": {
              "html": "<main>\n  <section class='box'>\n    <h2>Structural Layout</h2>\n    <p>This paragraph contains an <a href='#'>inline anchor link</a>.</p>\n  </section>\n</main>",
              "css": ".box {\n  padding: 20px;\n  background: rgba(251, 146, 60, 0.05);\n  border: 1px dashed #fb923c;\n  border-radius: 8px;\n}\nh2 { color: #fb923c; margin: 0 0 10px 0; }\na {\n  color: #2563eb;\n  font-weight: bold;\n}",
              "js": ""
            },
            "assessment": "Define the primary layout difference between block-level elements and inline elements."
          },
          {
            "id": "t3",
            "title": "3. Boilerplate",
            "visualization": "/html-structure.png",
            "customComponent": "HTMLBoilerplateInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Standard Skeleton Files",
                "content": "Every valid document begins with <!DOCTYPE html> to enforce modern compliant rendering mode, preventing browsers from entering legacy quirks mode."
              },
              {
                "level": "intermediate",
                "title": "Global UTF-8 Character Encoding",
                "content": "Declaring <meta charset='UTF-8'> inside the head block secures character mappings, preventing corrupted accents (mojibake) across browsers."
              },
              {
                "level": "advanced",
                "title": "Mobile Viewport Control",
                "content": "The meta viewport tag instructs mobile browsers to render layouts at device physical width, preventing tiny text rendering and pinch-zooms."
              }
            ],
            "detailedReference": {
              "summary": "Every document requires a standard template framework to coordinate configuration metrics. This provides structural guidelines to indexers and web parsers.",
              "keyConcepts": [
                { "term": "DOCTYPE Declaration", "definition": "A standard parser preamble. Enforces strict standards-mode parsing, avoiding legacy layout render methods in active browsers." },
                { "term": "UTF-8 Charset Encoding", "definition": "Character map containing accents, symbols, emojis, and global language sets to prevent rendering garbled glyph errors." },
                { "term": "Meta Viewport Matrix", "definition": "Guides scaling coordinates in mobile contexts, setting dimensions to physical widths to execute high-performance responsive scaling." }
              ],
              "bestPractices": [
                "Always place <!DOCTYPE html> on the absolute first line of every HTML file.",
                "Place character encoding declarations high inside the head section before large strings or titles.",
                "Enforce the standards-compliant viewport configuration to guarantee smooth responsive grids."
              ]
            },
            "codeTemplate": {
              "html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Boilerplate Lab</title>\n</head>\n<body>\n  <h1>Symmetric Skeleton Active</h1>\n  <p>Accents render safely: café, crème, © 2026</p>\n</body>\n</html>",
              "css": "body { padding: 20px; font-family: sans-serif; background: #fafafa; }",
              "js": ""
            },
            "assessment": "Draft a perfect HTML5 boilerplate template, and write a summary explaining the critical role of viewport and charset metadata tags."
          },
          {
            "id": "t4",
            "title": "4. Headings",
            "visualization": "/headings-hierarchy.png",
            "customComponent": "HTMLHeadingsInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Rank & Document Priority",
                "content": "HTML provides six headings levels (H1 to H6) to group document content and establish clear visual priority of content sections."
              },
              {
                "level": "intermediate",
                "title": "SEO & Indexing Stature",
                "content": "Search engines use headings to extract primary topics. Declare exactly one H1 per page representing the main keyword-rich page title."
              },
              {
                "level": "advanced",
                "title": "Accessibility Tree Rules",
                "content": "Screen-readers outline pages via heading hierarchies. Skipping ranks (H1 directly to H4) breaks outline mapping for visually impaired readers."
              }
            ],
            "detailedReference": {
              "summary": "Headings form the primary structural outline of document flows, assisting search indexing engines and screen reader outline navigation systems.",
              "keyConcepts": [
                { "term": "H1-H6 Hierarchy", "definition": "A visual and semantic cascading outline rank. Higher weights indicate core section landmarks." },
                { "term": "Single H1 Policy", "definition": "The search engine optimization standard stating every individual resource contains only one H1 representing primary topic focus." },
                { "term": "Sequential Outlines", "definition": "Avoiding level skipping to preserve clean tree outlines in text reading utilities." }
              ],
              "bestPractices": [
                "Reserve H1 strictly for the main title of the page.",
                "Never use heading tags simply to format or enlarge text. Use CSS typography rules for visual changes.",
                "Ensure heading elements maintain sequential order (e.g. H2 sections house H3 sub-topics)."
              ]
            },
            "codeTemplate": {
              "html": "<h1>Main Document Focus</h1>\n<h2>Sub-Section Title</h2>\n<h3>Micro-Detail Section</h3>",
              "css": "h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }\nh2 { color: #475569; }\nh3 { color: #64748b; font-style: italic; }",
              "js": ""
            },
            "assessment": "Create a semantic three-level hierarchy for a restaurant page containing menu classifications and pricing items."
          },
          {
            "id": "t5",
            "title": "5. Paragraphs",
            "visualization": "/lists-types.png",
            "customComponent": "HTMLParagraphsInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Passing Copy Passages",
                "content": "Paragraph elements (<p>) organize text blocks, applying default vertical margin spacing so adjacent copy sections do not clump."
              },
              {
                "level": "intermediate",
                "title": "Layout Line-Wrapping",
                "content": "Paragraphs are block boxes that automatically wrap inline text content dynamically to fit the width limits of parent containers."
              },
              {
                "level": "advanced",
                "title": "Spacing vs BR Breaks",
                "content": "Separate distinct concepts using separate <p> tags rather than hard line-breaks (<br>), which split text visually but ignore semantic thoughts."
              }
            ],
            "detailedReference": {
              "summary": "Paragraphs represent block-level structural blocks holding textual paragraphs, dynamically coordinating visual flow margins and text wraps.",
              "keyConcepts": [
                { "term": "Block margin boundaries", "definition": "Default vertical padding coordinates generated by browsers to space paragraphs cleanly." },
                { "term": "Dynamic text wrapping", "definition": "Text inside paragraphs scales and wraps to adjust to varying responsive column widths." },
                { "term": "Paragraph vs Break", "definition": "P tags denote semantic separations. BR elements indicate visual line changes within a single thought." }
              ],
              "bestPractices": [
                "Utilize distinct paragraph containers rather than chained <br> tags for layout spacing.",
                "Configure text line heights inside CSS to guarantee high-performance reading comfort.",
                "Wrap parent thoughts inside sections with clean paragraph containers."
              ]
            },
            "codeTemplate": {
              "html": "<p>First copy text block. The browser assigns automatic vertical margins to optimize scanning comfort.</p>\n<p>Second copy text block. Sits cleanly underneath without manual breaks.</p>",
              "css": "p {\n  color: #334155;\n  line-height: 1.6;\n  font-family: Georgia, serif;\n}",
              "js": ""
            },
            "assessment": "Identify the semantic and accessibility differences between grouping text inside separate <p> tags versus manually pushing text down with <br> breaks."
          },
          {
            "id": "t6",
            "title": "6. Formatting",
            "visualization": "/lists-types.png",
            "customComponent": "HTMLFormattingInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Linguistic vs Visual Focus",
                "content": "Visual formatting tags apply styling only. Semantic formatting tags (<strong> and <em>) add linguistic weight that search engines read."
              },
              {
                "level": "intermediate",
                "title": "Accessibility Voice Stress",
                "content": "Screen-readers raise volume or adjust vocal pitch when reading <strong> and <em> elements, indicating true emphasis to visually impaired users."
              },
              {
                "level": "advanced",
                "title": "Monospaced & Highlights",
                "content": "Use the <code> tag to render monospaced technical codes, and <mark> to highlight text blocks visually for rapid user scans."
              }
            ],
            "detailedReference": {
              "summary": "Semantic text formatting adds linguistic meaning, accessibility metadata, and styling rules to inline string selections.",
              "keyConcepts": [
                { "term": "Linguistic Emphasis", "definition": "Semantic elements represent physical emphasis, updating text parsing priorities." },
                { "term": "Screen Reader Intonation", "definition": "Assistive software translates tags like strong and em into audible pitch stresses." },
                { "term": "Technical Monospace", "definition": "Monospaced formatting tags isolating variables, keystrokes, and scripts from general body copy." }
              ],
              "bestPractices": [
                "Adopt <strong> and <em> elements in place of <b> and <i> tags to prioritize accessibility.",
                "Wrap code segments, variables, and commands within <code> tags.",
                "Use <mark> selectively to flag search matches or high-priority inline citations."
              ]
            },
            "codeTemplate": {
              "html": "<p>Please complete this <strong>CRITICAL</strong> action.</p>\n<p>Remember to execute the <code>npm run dev</code> command.</p>",
              "css": "strong { color: #dc2626; }\ncode {\n  background: #e2e8f0;\n  padding: 2px 6px;\n  border-radius: 4px;\n  color: #0f172a;\n}",
              "js": ""
            },
            "assessment": "Explain why <strong> and <em> elements are preferred over <b> and <i> elements for modern web accessibility."
          },
          {
            "id": "t7",
            "title": "7. Entities",
            "visualization": "/lists-types.png",
            "customComponent": "HTMLEntitiesInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Escaping Syntax Characters",
                "content": "Browsers use less-than (<) and greater-than (>) to parse HTML tags. Raw characters break layouts and cause security risks like XSS."
              },
              {
                "level": "intermediate",
                "title": "Entity Code Structure",
                "content": "HTML Entities start with & and end with ; to escape reserved characters (e.g. '&lt;' for '<'), allowing safe display of code snippets."
              },
              {
                "level": "advanced",
                "title": "Special Symbol Rendering",
                "content": "Entities secure consistent rendering of copyright (&copy;), registered trade (&reg;), and non-breaking spaces (&nbsp;) across all engines."
              }
            ],
            "detailedReference": {
              "summary": "Entities translate escaped key sequences into visual characters, securing parsing validation and bypassing markup parser bugs.",
              "keyConcepts": [
                { "term": "Entity Escape Coding", "definition": "Replacing structural markup delimiters with harmless textual abbreviations parsed dynamically." },
                { "term": "Syntactic Safety", "definition": "Protecting documents from executing unintended script blocks or broken parent nodes." },
                { "term": "Unicode Mappings", "definition": "Standard symbols, spaces, copyright marks, and global icons that bypass operating system limits." }
              ],
              "bestPractices": [
                "Always escape < and > symbols inside regular paragraphs as &lt; and &gt;.",
                "Use &amp; instead of raw ampersand characters in URLs and text to preserve strict W3C compatibility.",
                "Incorporate &copy; and &reg; entities to ensure legal symbols render correctly on all devices."
              ]
            },
            "codeTemplate": {
              "html": "<p>To display headers, write the &lt;h1&gt; entity format code.</p>\n<p>All assets are secured &copy; 2026.</p>",
              "css": "p { font-family: monospace; color: #0284c7; }",
              "js": ""
            },
            "assessment": "Explain what happens when a browser parses a raw less-than sign (<) in a text sentence, and detail how HTML entities bypass this issue."
          },
          {
            "id": "t8",
            "title": "Assignment Task",
            "visualization": "/lists-types.png",
            "customComponent": "HTMLPortfolioInteractive",
            "progression": [
              {
                "level": "easy",
                "title": "Base Document Blueprint",
                "content": "Initialize a valid HTML boilerplate skeleton, declaring standard <!DOCTYPE html>, UTF-8 character encoding, responsive viewport meta tags, and a body visual wrapper."
              },
              {
                "level": "intermediate",
                "title": "Nesting Semantic Layout Blocks",
                "content": "Organize your page body using structural semantic tags. Nest a header for branding, a main block for the biography details, and a footer for copyright metadata."
              },
              {
                "level": "advanced",
                "title": "Hierarchy, Formatting & Escapes",
                "content": "Use a clear headings structure with H1, H2, and H3 levels. Organize biography content inside paragraphs, highlight tech terms with strong, em, and code tags, and escape custom tag syntax using HTML entities."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Mission Objective: Recreate this Semantic Professional Biography using only Day 1 elements. No styling, links, lists, or images are allowed! -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Jane Developer Biography</title>\n</head>\n<body>\n\n  <header>\n    <h1>Jane Developer</h1>\n    <h3>Full Stack Software Architect</h3>\n  </header>\n\n  <main>\n    <section>\n      <h2>Professional Mission Statement</h2>\n      <p>I am dedicated to building high-performance, accessible web architectures. By understanding the core mechanics of client-server transactions and DOM compiling, I write optimized, clean structural components.</p>\n      <p>My core development directive is: always test changes locally using <code>npm run dev</code> before pushing to staging!</p>\n    </section>\n\n    <section>\n      <h2>Syllabus Mastery Progress</h2>\n      <p>Today I mastered <strong>HTML5 Document Structure</strong> and boilerplate configuration parameters, including the critical <em>meta viewport</em> scaling rule and <em>meta charset</em> character maps.</p>\n    </section>\n\n    <section>\n      <h2>Syntactic Escape Protocol</h2>\n      <p>When displaying markup snippets in my logs, I always use standard ampersand entity codes. For example, rendering the &lt;header&gt; and &lt;footer&gt; tag wrappers requires escaping brackets so browsers parse them as plain text rather than active structural nodes!</p>\n    </section>\n  </main>\n\n  <footer>\n    <p>Secure Node Access Secured &copy; 2026 Jane Developer. Under active local review.</p>\n  </footer>\n\n</body>\n</html>",
              "css": "",
              "js": ""
            },
            "assessment": "Final Challenge: Recreate this Semantic Professional Biography using the interactive code editor. Complete all requirements listed below to earn your badge!"
          },
          {
            "id": "w1-d1-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains slide decks, reference guides, student worksheets, and solution keys for this HTML Foundations session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Pedagogical goals, interactive visualization walkthrough notes, troubleshooting tips for students, and perfect solution files.",
              "duration": "15 mins",
              "resources": [
                "Hands-on Lab Worksheet & Prompts (PDF)",
                "Perfect Portfolio Reference Key (HTML)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d2",
        "dayTitle": "Day 2: Multimedia Elements & Metadata",
        "topics": [
          {
            "id": "d2-t1",
            "title": "1. Links & Navigation",
            "visualization": "/html-structure.png",
            "progression": [
              {
                "level": "easy",
                "title": "Anchor Basics & Href",
                "content": "The anchor tag establishes a hyperlink. The href attribute specifies the destination URL, and browsers default to blue underlined text."
              },
              {
                "level": "intermediate",
                "title": "Targets & External Links",
                "content": "Using target='_blank' opens links in fresh tabs. Always append rel='noopener noreferrer' to secure against host thread vulnerability hijacking."
              },
              {
                "level": "advanced",
                "title": "Absolute vs Relative Paths",
                "content": "Absolute paths target remote servers globally. Relative paths connect internal sub-pages within local file structures, ensuring build portability."
              }
            ],
            "detailedReference": {
              "summary": "Hyperlinks form the connective tissue of the global web, enabling users and search spiders to traverse unrelated resources and navigate nested portal pathways.",
              "keyConcepts": [
                { "term": "Target Specifiers", "definition": "Instructing the user-agent where to render the fetched resource (current viewport vs fresh sandboxed tab)." },
                { "term": "Window Security", "definition": "Mitigating cross-origin information leaks by stripping dynamic referrer URLs when spawning new browser threads." },
                { "term": "Addressing Modes", "definition": "Distinguishing fully qualified global domain endpoints from local, directory-relative pathways." }
              ],
              "bestPractices": [
                "Always append rel='noopener noreferrer' when targeting blank windows to seal window handle vulnerabilities.",
                "Prefer relative paths for local site structures to ensure portable hosting builds across staging environments.",
                "Ensure descriptive link anchors are readable and explain the actual target, entirely avoiding generic phrases like 'Click Here'."
              ]
            },
            "codeTemplate": {
              "html": "<nav>\n  <a href='https://github.com' target='_blank' rel='noopener noreferrer'>Visit GitHub Profile</a> |\n  <a href='#about'>Learn More About Me</a>\n</nav>",
              "css": "a {\n  color: #00d1d1;\n  text-decoration: none;\n  font-weight: 600;\n  transition: opacity 0.2s;\n}\na:hover { opacity: 0.8; }",
              "js": ""
            },
            "assessment": "Draft a navigation bar with at least two internal anchors and one external anchor that opens in a fresh browser tab."
          },
          {
            "id": "d2-t2",
            "title": "2. Images & Graphic Embeds",
            "progression": [
              {
                "level": "easy",
                "title": "Image Rendering Basics",
                "content": "The img element integrates graphics. It is a self-closing tag requiring src and alt attributes for valid structure."
              },
              {
                "level": "intermediate",
                "title": "Alternative Text (Alt)",
                "content": "Alt text provides descriptive copy to screen readers for accessibility, and renders if dynamic remote assets fail to load."
              },
              {
                "level": "advanced",
                "title": "Sizing & Aspect Controls",
                "content": "Define explicit width and height pixel fields to pre-allocate element blocks, completely preventing Cumulative Layout Shifts (CLS)."
              }
            ],
            "detailedReference": {
              "summary": "Image integration bridges binary vector and raster assets with layout geometry, balancing user experience with asset bandwidth budget constraints.",
              "keyConcepts": [
                { "term": "Cumulative Layout Shift (CLS)", "definition": "Visual instability caused when browser engines redraw elements after delayed image downloads." },
                { "term": "Alternative Metadata (Alt)", "definition": "Providing descriptive text alternatives for screen reader consumption and broken network fallbacks." },
                { "term": "Raster vs Vector Assets", "definition": "Decoupling pixel-based layouts from responsive, math-driven visual graphics." }
              ],
              "bestPractices": [
                "Always define raw height and width boundaries on image tags to reserve space and prevent layout shifts.",
                "Keep alternative text concise, meaningful, and strictly descriptive of the graphic's actual informational value.",
                "Choose scalable vectors (SVG) for UI widgets and optimized modern web formats (WebP) for photographs."
              ]
            },
            "codeTemplate": {
              "html": "<img src='https://picsum.photos/300/200?random=1' alt='A high-performance modern laptop workstation sitting on an office desk' width='300' height='200'>",
              "css": "img {\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n  display: block;\n  max-width: 100%;\n  height: auto;\n}",
              "js": ""
            },
            "assessment": "Embed a remote image graphic with alternative text containing at least 5 words and a matching pixel width parameter."
          },
          {
            "id": "d2-t3",
            "title": "3. Audio Element & Controls",
            "progression": [
              {
                "level": "easy",
                "title": "Playable Audio Logs",
                "content": "The audio tag renders audio tracks directly. Declaring the controls attribute displays standard browser play, seek, and volume keys."
              },
              {
                "level": "intermediate",
                "title": "Format Audio Sources",
                "content": "Nest multiple source tags with varying mime types to secure cross-device support across different rendering engines."
              },
              {
                "level": "advanced",
                "title": "Playback Fallback Copy",
                "content": "Include explicit fallback notice copy inside the tags to guide legacy system engines that lack native media player components."
              }
            ],
            "detailedReference": {
              "summary": "Native browser sound playback utilizes standard hardware pipelines, removing legacy requirements for heavy external plug-ins or custom JS wrappers.",
              "keyConcepts": [
                { "term": "Format Fallbacks", "definition": "Defining multiple sequential source nodes to support different operating system capabilities." },
                { "term": "Native Player UI", "definition": "Invoking sandboxed playback controls directly within browser layers using semantic attributes." },
                { "term": "Legacy Hooks", "definition": "Writing standard textual elements inside tags for legacy indexers and out-of-date clients." }
              ],
              "bestPractices": [
                "Provide standard MP3 and OGG formats within child source tags to achieve universal device compatibility.",
                "Ensure the controls attribute is present unless implementing a custom visual interface via JavaScript.",
                "Always place descriptive fallbacks inside the audio tag to assist legacy systems."
              ]
            },
            "codeTemplate": {
              "html": "<audio controls>\n  <source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' type='audio/mpeg'>\n  Your browser does not support the audio element.\n</audio>",
              "css": "audio {\n  width: 100%;\n  max-width: 320px;\n  outline: none;\n}",
              "js": ""
            },
            "assessment": "Add a standard audio element with controls containing at least one fallback download notice."
          },
          {
            "id": "d2-t4",
            "title": "4. Video Integration & Formats",
            "progression": [
              {
                "level": "easy",
                "title": "Rich Video Integration",
                "content": "The video tag embeds rich playable videos, providing timelines, fullscreens, and toggles directly in hardware layers."
              },
              {
                "level": "intermediate",
                "title": "Video Player Parameters",
                "content": "Configure loop, muted, and posters to customize layouts, adhering to standard 16:9 aspects to avoid black letterboxing."
              },
              {
                "level": "advanced",
                "title": "Autoplay Constraints",
                "content": "Modern security frameworks block autoplaying video media unless the muted attribute is explicitly declared alongside it."
              }
            ],
            "detailedReference": {
              "summary": "High-performance video players run directly within hardware-accelerated sandboxes, enabling responsive streams without freezing browser threads.",
              "keyConcepts": [
                { "term": "Muted Autoplay Security", "definition": "Universal browser security policies that reject video autoplay loops unless audio streams are muted." },
                { "term": "Letterbox Mitigation", "definition": "Allocating standardized frame dimensions to bypass dark letterbox boundaries." },
                { "term": "Buffering Directives", "definition": "Instructing the browser whether to pull media headers before user interaction." }
              ],
              "bestPractices": [
                "Combine 'autoplay', 'muted', and 'loop' to design gorgeous, silent backdrop loops without freezing the main thread.",
                "Configure the 'poster' attribute to display a static graphic placeholder while the video is buffered.",
                "Select MP4/H.264 formats for reliable, cross-browser compatibility and optimized file sizes."
              ]
            },
            "codeTemplate": {
              "html": "<video controls width='320' height='240' loop muted>\n  <source src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' type='video/mp4'>\n  Your browser does not support the video tag.\n</video>",
              "css": "video {\n  border-radius: 12px;\n  border: 2px solid #1e293b;\n  display: block;\n}",
              "js": ""
            },
            "assessment": "Embed a video player with controls that repeats automatically in a muted state."
          },
          {
            "id": "d2-t5",
            "title": "5. iframes & Sandboxed Embedding",
            "progression": [
              {
                "level": "easy",
                "title": "Nested Page Embedding",
                "content": "iframes embed visual viewport windows targeting secondary documents (e.g. Google Maps or external dashboards) inside the layout."
              },
              {
                "level": "intermediate",
                "title": "Sandboxing parameters",
                "content": "Declare the sandbox attribute to lock down script executions, cookie accesses, and redirects inside the nested frame window."
              },
              {
                "level": "advanced",
                "title": "Accessibility Mapping",
                "content": "Include descriptive title attributes on frame elements to guarantee screen readers announce their nested visual content clearly."
              }
            ],
            "detailedReference": {
              "summary": "Inline frames partition documents into separate sandboxed browsing contexts, securing host scopes from embedded script execution vulnerabilities.",
              "keyConcepts": [
                { "term": "Same-Origin Lockdowns", "definition": "Denying nested frames direct access to the parent window's local storage, memory, and state." },
                { "term": "Sandboxing Privileges", "definition": "Isolating embedded windows with strict restrictions unless explicit privileges are allowed." },
                { "term": "Accessibility Announcements", "definition": "Declaring descriptive labels to tell screen readers what frame modules are active." }
              ],
              "bestPractices": [
                "Always declare the 'sandbox' attribute with minimal allowed tokens ('allow-scripts', 'allow-same-origin').",
                "Include clear, concise title tags on every iframe element to satisfy accessibility parameters.",
                "Set styling to border: none to seamlessly blend nested widgets within the container design."
              ]
            },
            "codeTemplate": {
              "html": "<iframe src='about:blank' title='Sandboxed Developer Workspace Embed' width='100%' height='200' sandbox></iframe>",
              "css": "iframe {\n  border: 2px dashed #00d1d1;\n  border-radius: 8px;\n  background: #f8fafc;\n}",
              "js": ""
            },
            "assessment": "Add a sandboxed iframe with a title attribute for assistive accessibility."
          },
          {
            "id": "d2-t6",
            "title": "6. Meta Tags & Document Config (SEO)",
            "progression": [
              {
                "level": "easy",
                "title": "Metadata Infrastructure",
                "content": "Meta tags reside inside the head tag, holding document directives that search crawlers parse but screen viewports do not render."
              },
              {
                "level": "intermediate",
                "title": "Standard viewports & charsets",
                "content": "Enforce mobile viewport scaling and UTF-8 charset declarations to prevent rendering page bugs across diverse high-density layouts."
              },
              {
                "level": "advanced",
                "title": "SEO Keywords & Descriptions",
                "content": "Configure descriptions and Open Graph (OG) tags to control visual card preview representations when pages are shared."
              }
            ],
            "detailedReference": {
              "summary": "Document metadata defines critical parsing rules, encoding models, indexing flags, and social graph cards inside the head context.",
              "keyConcepts": [
                { "term": "Viewport Rules", "definition": "Enforcing pixel-perfect scaling across high-density mobile viewports." },
                { "term": "Open Graph Protocol", "definition": "Injecting semantic meta headers to customize card snippets when sharing on social media platforms." },
                { "term": "Unicode Decoders", "definition": "Instructing the parser to decode files using standardized global charset grids." }
              ],
              "bestPractices": [
                "Define <meta charset='UTF-8'> as the first tag inside the <head> block to prevent parser errors.",
                "Limit meta descriptions to 150-160 characters to ensure perfect display on search engines.",
                "Incorporate Open Graph attributes (og:title, og:description) to drive sharing engagement."
              ]
            },
            "codeTemplate": {
              "html": "<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <meta name='description' content='Jane Developer multimedia showcase portfolio.'>\n  <meta name='keywords' content='Portfolio, Jane Developer, Web Architect'>\n  <title>Metadata Workspace</title>\n</head>\n<body>\n  <p>Metadata configured inside the head tag block!</p>\n</body>\n</html>",
              "css": "body { padding: 16px; font-family: sans-serif; }",
              "js": ""
            },
            "assessment": "Draft a head block containing standard mobile viewport scaling, charset definitions, and SEO descriptions."
          },
          {
            "id": "d2-t7",
            "title": "Assignment Task",
            "visualization": "/lists-types.png",
            "progression": [
              {
                "level": "easy",
                "title": "Metadata Setup & Anchor Hierarchy",
                "content": "Configure HTML boilerplate meta tags (charset, viewport, description, keywords). Set up a responsive navigation panel with internal and external links."
              },
              {
                "level": "intermediate",
                "title": "Embedded headshots & audio logs",
                "content": "Embed a visual headshot using an img tag with clean descriptions. Add a playable audio log explaining client-side multimedia integration details."
              },
              {
                "level": "advanced",
                "title": "Video walkthroughs & Sandboxed iframes",
                "content": "Integrate a muted, looping video project showcase. Add an accessible, sandboxed iframe demonstrating nested dashboard operations."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Mission Objective: Recreate this Multimedia Developer Biography using only Day 1 and Day 2 elements. Ensure you satisfy all checklist requirements! -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Multimedia portfolio showcase for Jane Developer, highlighting core web capabilities, video walk-throughs, and interactive audio logs.\">\n  <meta name=\"keywords\" content=\"Jane Developer, Full Stack Software Architect, Multimedia Portfolio, HTML5 Media\">\n  <title>Jane Developer - Multimedia Showcase</title>\n</head>\n<body>\n\n  <header>\n    <h1>Jane Developer</h1>\n    <h3>Full Stack Software Architect</h3>\n    <nav>\n      <a href=\"#about\">About Me</a> |\n      <a href=\"#media\">Media Showcase</a> |\n      <a href=\"#interactive\">Interactive Nodes</a> |\n      <a href=\"https://github.com\" target=\"_blank\">GitHub Profile</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id=\"about\">\n      <h2>Professional Mission Statement</h2>\n      <p>I am dedicated to building high-performance, accessible web architectures. In my showcase below, you can inspect custom structural layouts, local audio logs, and dynamic embedded assets.</p>\n      <img src=\"https://picsum.photos/300/200?random=1\" alt=\"Jane Developer professional headshot with desk background\" width=\"300\" height=\"200\">\n    </section>\n\n    <section id=\"media\">\n      <h2>Multimedia Integration</h2>\n      <h3>Audio Lecture Log</h3>\n      <p>Listen to my commentary on mastering client-side media rendering protocols:</p>\n      <audio controls>\n        <source src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\" type=\"audio/mpeg\">\n        Your browser does not support the audio element.\n      </audio>\n\n      <h3>Video Project Walkthrough</h3>\n      <p>Watch my technical walkthrough demonstration explaining structural markup compilation:</p>\n      <video controls width=\"320\" height=\"240\" loop muted>\n        <source src=\"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4\" type=\"video/mp4\">\n        Your browser does not support the video element.\n      </video>\n    </section>\n\n    <section id=\"interactive\">\n      <h2>Embedded Sandboxed Nodes</h2>\n      <p>Below is a live, sandboxed embed showcasing our course map:</p>\n      <iframe src=\"about:blank\" title=\"Sandboxed Embed Map\" width=\"100%\" height=\"200\" sandbox></iframe>\n    </section>\n  </main>\n\n  <footer>\n    <p>Secure Node Access Secured &copy; 2026 Jane Developer. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>",
              "css": "",
              "js": ""
            },
            "assessment": "Final Challenge: Recreate this Multimedia Developer Biography using the interactive code editor. Satisfy all dynamic metadata, anchors, images, audio, video, and iframe requirements to earn your credentials!"
          },
          {
            "id": "w1-d2-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Talking points, media integration timeline, sandbox security warnings, and reference layouts.",
              "duration": "15 mins",
              "resources": [
                "Multimedia Lab Guide & Assets Worksheet (PDF)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d3",
        "dayTitle": "Day 3: Advanced HTML Structures",
        "topics": [
          {
            "id": "d3-t1",
            "title": "1. Lists & Structural Bulleting",
            "visualization": "/css-box-model.png",
            "progression": [
              {
                "level": "easy",
                "title": "Lists Classifications",
                "content": "HTML provides ordered lists (<ol>) for numbered sequences and unordered lists (<ul>) for bulleted list arrays, grouping related elements logically."
              },
              {
                "level": "intermediate",
                "title": "Unordered Bullet Options",
                "content": "Customize bullet markers visually using stylesheet 'list-style-type' attributes (e.g. square, circle) or dynamic vector SVG pointers."
              },
              {
                "level": "advanced",
                "title": "Ordered Sequence Schemes",
                "content": "Configure numbering schemes using 'type' attributes (e.g. Roman numerals, letters) and set custom starter indices with 'start'."
              }
            ],
            "detailedReference": {
              "summary": "HTML lists establish structural relationships between related elements, conveying ordered sequences or grouped items to search engines and screen readers.",
              "keyConcepts": [
                { "term": "Structural Semantics", "definition": "Conveying that individual items share a logical parent relationship rather than just being separated by line breaks." },
                { "term": "Sequence Manipulation", "definition": "Adjusting start indexes, descending numbering directions, or Roman/alphabetic formatting schemas." },
                { "term": "Deep Hierarchical Nesting", "definition": "Embedding list structures cleanly inside specific list items to construct complex layout hierarchies." }
              ],
              "bestPractices": [
                "Ensure child elements nested inside <ul> or <ol> elements are strictly limited to <li> tags.",
                "Use ordered lists when the sequence of operations directly impacts the final result (e.g., procedural tutorials).",
                "Prefer stylesheet styling ('list-style-type') rather than outdated physical markup attributes."
              ]
            },
            "codeTemplate": {
              "html": "<h3>Course Prerequisites</h3>\n<ul>\n  <li>Basic internet access protocols</li>\n  <li>Day 1 & Day 2 HTML basics</li>\n</ul>\n\n<h3>Step-by-Step Directives</h3>\n<ol type='A'>\n  <li>Configure local workspace environment</li>\n  <li>Initialize boilerplate documents</li>\n</ol>",
              "css": "ul { padding-left: 20px; color: #cbd5e1; }\nol { padding-left: 20px; color: #38bdf8; }",
              "js": ""
            },
            "assessment": "Draft an ordered list containing three tasks, using Roman numerals as indicators."
          },
          {
            "id": "d3-t2",
            "title": "2. Tables & Tabular Data",
            "visualization": "/css-selectors.png",
            "progression": [
              {
                "level": "easy",
                "title": "Symmetric Table Containers",
                "content": "Tables arrange data in grids. Rows (<tr>) hold headers (<th>) with bold weights and data cells (<td>) representing key values."
              },
              {
                "level": "intermediate",
                "title": "Table Elements Division",
                "content": "Segment grids semantically into <thead>, <tbody>, and <tfoot> to enable indexers to navigate multi-column logs cleanly."
              },
              {
                "level": "advanced",
                "title": "Tabular Styling Rules",
                "content": "Apply 'border-collapse: collapse' stylesheets to merge adjacent cell borders into a sleek, unified, highly readable matrix."
              }
            ],
            "detailedReference": {
              "summary": "Tabular structures organize two-dimensional data arrays into clear grids, maintaining distinct visual rows and columns with semantic tag hierarchies.",
              "keyConcepts": [
                { "term": "Tabular Segmentation", "definition": "Organizing grid content into designated headers, core data sets, and bottom summaries for crawlers." },
                { "term": "Zebra Striping Controls", "definition": "Injecting zebra patterns inside matching stylesheet elements to make complex rows easily scannable." },
                { "term": "Semantic Scoping", "definition": "Binding headers explicitly to columns or rows using standard scope parameters." }
              ],
              "bestPractices": [
                "Apply standard semantical tags (thead, tbody, tfoot) to ensure readable data structures.",
                "Incorporate border-collapse: collapse in your CSS file to make grid lines professional.",
                "Add text-align configurations in table styles to keep numerical data perfectly visible."
              ]
            },
            "codeTemplate": {
              "html": "<table>\n  <thead>\n    <tr>\n      <th>Course</th>\n      <th>Lectures</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>HTML Foundations</td>\n      <td>12 Labs</td>\n    </tr>\n  </tbody>\n</table>",
              "css": "table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 10px;\n}\nth, td {\n  padding: 10px;\n  text-align: left;\n  border: 1px solid #334155;\n}\nth { background: #1e293b; color: #00d1d1; }",
              "js": ""
            },
            "assessment": "Build a two-row table representing three standard developer skills and competency levels."
          },
          {
            "id": "d3-t3",
            "title": "3. Colspan & Rowspan (Grid Spanning)",
            "progression": [
              {
                "level": "easy",
                "title": "Merged Columns (Colspan)",
                "content": "Apply the 'colspan' attribute to span cells horizontally across multiple columns, perfect for designing full-width title headers."
              },
              {
                "level": "intermediate",
                "title": "Merged Rows (Rowspan)",
                "content": "Apply the 'rowspan' attribute to span cells vertically down across multiple rows, perfect for presenting shared schedule blocks."
              },
              {
                "level": "advanced",
                "title": "Grid Balancing Constraints",
                "content": "Carefully omit overlapping subsequent td cell blocks in your markup to balance layouts and prevent table structural misalignment."
              }
            ],
            "detailedReference": {
              "summary": "Cell spanning attributes allow tables to break out of rigid symmetrical grids, spanning multiple visual cells horizontally or vertically.",
              "keyConcepts": [
                { "term": "Horizontal Integration", "definition": "Extending a data block over multiple column slots for headers or section categories." },
                { "term": "Vertical Integration", "definition": "Extending a data block down over multiple row slots for time blocks or master categories." },
                { "term": "Markup Offsetting", "definition": "Omitting duplicate cell declarations in target coordinates to accommodate spanned dimensions." }
              ],
              "bestPractices": [
                "Count target column widths carefully before configuring spanning to prevent tables from breaking.",
                "Omit duplicate td elements in subsequent rows when applying rowspan.",
                "Add visual background highlighting classes to spanned cells to convey category hierarchies."
              ]
            },
            "codeTemplate": {
              "html": "<table border='1' style='border-collapse: collapse; width: 100%;'>\n  <tr>\n    <th>Time</th>\n    <th>Monday</th>\n    <th>Wednesday</th>\n  </tr>\n  <tr>\n    <td>09:00 AM</td>\n    <td rowspan='2'>Full Stack Architecture Lab</td>\n    <td>APIs</td>\n  </tr>\n  <tr>\n    <td>11:00 AM</td>\n    <td>Databases</td>\n  </tr>\n  <tr>\n    <td>02:00 PM</td>\n    <td colspan='2'>Weekly Evaluation Sync</td>\n  </tr>\n</table>",
              "css": "th, td { padding: 8px; border: 1px solid #475569; text-align: center; }",
              "js": ""
            },
            "assessment": "Draft a table with a merged header row that spans across three columns."
          },
          {
            "id": "d3-t4",
            "title": "4. HTML Forms & Data Collection",
            "progression": [
              {
                "level": "easy",
                "title": "Interactive Forms wrapper",
                "content": "The form element acts as a visual wrapper that aggregates interactive field selections, preparing user entries for server transfers."
              },
              {
                "level": "intermediate",
                "title": "Labels Binding & Accessibility",
                "content": "Use explicit labels bound via 'for' to input IDs to increase mobile touch target scales and supply clean context to screen reader programs."
              },
              {
                "level": "advanced",
                "title": "Standard Submission Protocols",
                "content": "Configure 'action' target URLs and 'method' parameters (GET for parameters in URLs vs POST for secure payloads inside request bodies)."
              }
            ],
            "detailedReference": {
              "summary": "Forms aggregate independent visual controls and input elements, packaging user data securely for server-side processing.",
              "keyConcepts": [
                { "term": "Transmission Pipelines", "definition": "Selecting standard data transmission models (GET requests vs POST creations)." },
                { "term": "Target Handlers", "definition": "Routing form datasets to target server actions and endpoints." },
                { "term": "Label Binding Scopes", "definition": "Coupling text cues directly to core inputs via explicit attribute mappings." }
              ],
              "bestPractices": [
                "Always couple inputs with explicit labels, matching the 'for' and 'id' parameters.",
                "Define the method parameter as POST when submitting sensitive user profile information.",
                "Set a clear name property on every input to ensure datasets are serialized correctly on submit."
              ]
            },
            "codeTemplate": {
              "html": "<form action='/enroll' method='POST'>\n  <label for='studentName'>Student Name:</label>\n  <input type='text' id='studentName' name='studentName' placeholder='Enter your name' required>\n  <button type='submit'>Register</button>\n</form>",
              "css": "form { display: flex; flex-direction: column; gap: 10px; max-width: 300px; }\ninput { padding: 8px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }\nbutton { background: #00d1d1; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }",
              "js": ""
            },
            "assessment": "Build a form containing a single bound text input and a submit button."
          },
          {
            "id": "d3-t5",
            "title": "5. Input Controls & Validation",
            "progression": [
              {
                "level": "easy",
                "title": "Input Type Variations",
                "content": "Inputs adapt automatically to type attributes: 'text' for names, 'email' for basic formatting, and 'password' to secure text inputs."
              },
              {
                "level": "intermediate",
                "title": "HTML5 Validation Attributes",
                "content": "Enforce validations inside browser engines using attributes like 'required', 'placeholder', 'minlength', or regex 'pattern' masks."
              },
              {
                "level": "advanced",
                "title": "Mobile Input Keyboard Maps",
                "content": "Declaring semantic types (e.g. type='tel' or type='number') automatically displays matching, optimized smartphone keyboards."
              }
            ],
            "detailedReference": {
              "summary": "Client-side form validation enforces structural restrictions on user data inputs before server-side database handoffs.",
              "keyConcepts": [
                { "term": "Constraint Validation", "definition": "Browser engines natively blocking empty submissions and invalid formatting configurations." },
                { "term": "Dynamic Keyboard Layouts", "definition": "Declaring specific input types to launch optimized smartphone keyboard layouts." },
                { "term": "Regular Expression Validation", "definition": "Leveraging client pattern matching to validate custom structural formats." }
              ],
              "bestPractices": [
                "Use specific types like 'email', 'number', or 'tel' rather than generic 'text' tags.",
                "Implement appropriate minlength/maxlength limits on all password blocks.",
                "Combine basic HTML5 front-end validations with backend checking to ensure security."
              ]
            },
            "codeTemplate": {
              "html": "<label for='userMail'>Email Address:</label>\n<input type='email' id='userMail' placeholder='student@wemade.com' required>\n<br><br>\n<label for='userPass'>Access Code:</label>\n<input type='password' id='userPass' minlength='6' placeholder='Min 6 chars' required>",
              "css": "input { padding: 8px; border-radius: 4px; border: 1px solid #334155; background: #0f172a; color: white; }\ninput:invalid { border-color: #ef4444; }\ninput:valid { border-color: #10b981; }",
              "js": ""
            },
            "assessment": "Draft an email input field that is marked as required and has a matching placeholder."
          },
          {
            "id": "d3-t6",
            "title": "6. Modern Selection Fields",
            "progression": [
              {
                "level": "easy",
                "title": "Checkboxes (Multiple choices)",
                "content": "Checkboxes (<input type='checkbox'>) capture multiple non-exclusive choices, acting as independent select toggles."
              },
              {
                "level": "intermediate",
                "title": "Radio Buttons (Unique choices)",
                "content": "Radio buttons restrict choices to a single option. Declare matching 'name' attributes on all options to group them cleanly."
              },
              {
                "level": "advanced",
                "title": "Fieldsets and Legends",
                "content": "Wrap options inside a semantic <fieldset> box and configure a <legend> header label to group visual segments cleanly."
              }
            ],
            "detailedReference": {
              "summary": "Selection fields provide structured controls for choosing options, preventing typo-prone manual entries.",
              "keyConcepts": [
                { "term": "Exclusive Selections", "definition": "Declaring grouped names on radio buttons to allow only one active choice." },
                { "term": "Multi-Select Structures", "definition": "Aggregating checkbox vectors to submit array values." },
                { "term": "Semantic Groups", "definition": "Surrounding visual choices with fieldset borders and legend headers." }
              ],
              "bestPractices": [
                "Always wrap radio buttons and checkboxes within fieldsets to organize options logically.",
                "Ensure radio option keys in the same question share matching name values.",
                "Provide a checked attribute by default on one radio button in each group to simplify user actions."
              ]
            },
            "codeTemplate": {
              "html": "<fieldset>\n  <legend>Select Track Mode</legend>\n  <input type='radio' id='modeFull' name='trackMode' value='full' checked>\n  <label for='modeFull'>Full Stack</label><br>\n  <input type='radio' id='modeFront' name='trackMode' value='front'>\n  <label for='modeFront'>Frontend</label>\n</fieldset>\n<br>\n<label>\n  <input type='checkbox' name='agree' required>\n  I agree to Wemade terms.\n</label>",
              "css": "fieldset { border: 1px solid #334155; padding: 15px; border-radius: 8px; }\nlegend { color: #00d1d1; padding: 0 5px; font-weight: bold; }",
              "js": ""
            },
            "assessment": "Create a grouped fieldset containing two radio options sharing a matching name."
          },
          {
            "id": "d3-t7",
            "title": "Assignment Task",
            "visualization": "/lists-types.png",
            "progression": [
              {
                "level": "easy",
                "title": "Syllabus Lists & Table Headers",
                "content": "Setup standard course prerequisites using an HTML list. Build an academic schedule table containing column headers."
              },
              {
                "level": "intermediate",
                "title": "Cell Spanning & Form Fieldsets",
                "content": "Apply colspan and rowspan inside schedule columns and rows to merge overlapping slots. Setup a registration form with a fieldset wrapper."
              },
              {
                "level": "advanced",
                "title": "Inputs Validation & Selections",
                "content": "Configure text, email, and checkbox elements, implementing validation attributes. Add cohort selection radio button groups and submit keys."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Mission Objective: Recreate this Student Enrollment & Registration Portal using advanced Day 3 structures. Ensure all checklist requirements are fully satisfied! -->\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Student enrollment and interactive course registration portal for Wemade Logix.\">\n  <meta name=\"keywords\" content=\"Enrollment, Registration, Course Schedule, HTML5 Forms\">\n  <title>Student Registration & Schedule Portal</title>\n</head>\n<body>\n\n  <header>\n    <h1>Wemade Logix Learning Academy</h1>\n    <h3>Advanced HTML Structural Course Registry</h3>\n  </header>\n\n  <main>\n    <!-- Course Prerequisites -->\n    <section>\n      <h2>MERN Stack Course Prerequisites</h2>\n      <p>Before launching your registration request, please confirm you have reviewed the following baseline structures:</p>\n      <ul>\n        <li><strong>Day 1 Foundations:</strong> Semantic layouts, structural heading hierarchies, and escapings.</li>\n        <li><strong>Day 2 Multimedia:</strong> External anchor logs, responsive headshots, and media playback.</li>\n      </ul>\n    </section>\n\n    <!-- Interactive Schedule (Tables, Colspan, Rowspan) -->\n    <section>\n      <h2>Weekly Classroom Schedule</h2>\n      <p>Our unified lecture schedule merges overlapping blocks for intensive modules:</p>\n      <table border=\"1\" cellpadding=\"8\" style=\"border-collapse: collapse; width: 100%;\">\n        <thead>\n          <tr>\n            <th>Time Slot</th>\n            <th>Monday</th>\n            <th>Wednesday</th>\n            <th>Friday</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>09:00 AM - 11:00 AM</td>\n            <td rowspan=\"2\">Full Stack Architecture Lab</td>\n            <td>Database Schemas</td>\n            <td>Network Nodes</td>\n          </tr>\n          <tr>\n            <td>11:00 AM - 01:00 PM</td>\n            <td colspan=\"2\">API Pipeline Workshop</td>\n          </tr>\n          <tr>\n            <td>02:00 PM - 04:00 PM</td>\n            <td>CSS Styling Basics</td>\n            <td>Responsive Flexbox</td>\n            <td>Weekly Evaluation Sync</td>\n          </tr>\n        </tbody>\n      </table>\n    </section>\n\n    <!-- Student Registration Form -->\n    <section>\n      <h2>Student Registry Application</h2>\n      <p>Complete this standard enrollment form to secure your seat inside our next cohort:</p>\n      <form action=\"/submit-registration\" method=\"POST\">\n        <fieldset>\n          <legend>Student Profile Information</legend>\n          \n          <p>\n            <label for=\"fullName\">Full Name:</label><br>\n            <input type=\"text\" id=\"fullName\" name=\"fullName\" placeholder=\"Enter your full name\" required>\n          </p>\n          \n          <p>\n            <label for=\"emailAddr\">Academic Email Address:</label><br>\n            <input type=\"email\" id=\"emailAddr\" name=\"emailAddr\" placeholder=\"student@academy.com\" required>\n          </p>\n\n          <p>\n            <label>Select Cohort track:</label><br>\n            <input type=\"radio\" id=\"trackFrontend\" name=\"cohortTrack\" value=\"frontend\">\n            <label for=\"trackFrontend\">Frontend Developer</label><br>\n            <input type=\"radio\" id=\"trackBackend\" name=\"cohortTrack\" value=\"backend\">\n            <label for=\"trackBackend\">Backend Developer</label>\n          </p>\n          \n          <p>\n            <input type=\"checkbox\" id=\"termsCheck\" name=\"termsCheck\" required>\n            <label for=\"termsCheck\">I agree to Wemade Academy's code of conduct and safety regulations.</label>\n          </p>\n        </fieldset>\n        \n        <p>\n          <button type=\"submit\">Submit Registration</button>\n        </p>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <p>Academic Access Secured &copy; 2026 Wemade Logix. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>",
              "css": "",
              "js": ""
            },
            "assessment": "Final Challenge: Recreate this Student Enrollment & Registration Portal using the interactive code editor. Satisfy all dynamic lists, tables, grid spanning (colspan/rowspan), form fieldsets, input validations, and checkbox requirements to earn your advanced credentials!"
          },
          {
            "id": "w1-d3-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Talking points, advanced grid spanning diagrams, security guidelines for forms validation, and structural solutions.",
              "duration": "15 mins",
              "resources": [
                "Student Interactive Lab & Schedules Worksheet (PDF)",
                "Wemade Registration Portal Solution File (HTML)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d4",
        "dayTitle": "Day 4: Mastering Flexbox Layouts",
        "topics": [
          {
            "id": "d4-t1",
            "title": "1. CSS Display Property",
            "visualization": "/css-display.png",
            "progression": [
              {
                "level": "easy",
                "title": "How Elements Occupy Space",
                "content": "Every HTML element has a default display behavior. 'Block' elements (like <div>) stack on top of each other, while 'Inline' elements (like <span>) sit side-by-side like words in a sentence."
              },
              {
                "level": "intermediate",
                "title": "Inline-Block",
                "content": "Inline-block is the 'best of both worlds'. Elements sit side-by-side, but you can still give them a specific width, height, margin, and padding."
              },
              {
                "level": "advanced",
                "title": "The 'Display: None' Trick",
                "content": "Setting 'display: none' completely removes an element from the page layout. It's not just hidden; it's gone as if it never existed until you turn it back on with JavaScript or CSS."
              }
            ],
            "codeTemplate": {
              "html": "<div class='block'>Block 1</div>\n<div class='block'>Block 2</div>\n<span class='inline'>Inline 1</span>\n<span class='inline'>Inline 2</span>",
              "css": ".block {\n  background: #0ea5e9;\n  color: white;\n  padding: 10px;\n  margin-bottom: 5px;\n}\n.inline {\n  background: #4ade80;\n  padding: 5px;\n}",
              "js": ""
            },
            "assessment": "Convert two block elements into inline-block elements and set their width to 100px."
          },
          {
            "id": "d4-t2",
            "title": "2. Flexbox Basics",
            "visualization": "/flex-axis.png",
            "progression": [
              {
                "level": "easy",
                "title": "Introduction to Flex",
                "content": "Flexbox (Flexible Box) is a modern layout system. It's designed to align elements in a row or column, and it can grow or shrink them to fill the available space automatically."
              },
              {
                "level": "intermediate",
                "title": "Container vs Items",
                "content": "Flexbox works on a Parent-Child relationship. You turn a parent into a 'Flex Container' using 'display: flex', and its children automatically become 'Flex Items'."
              },
              {
                "level": "advanced",
                "title": "The Main vs Cross Axis",
                "content": "Flexbox has two directions. The Main Axis is where your items flow (usually horizontal), and the Cross Axis is the vertical direction. Understanding this is key to mastering Flexbox."
              }
            ],
            "codeTemplate": {
              "html": "<div class='flex-root'>\n  <div class='item'>1</div>\n  <div class='item'>2</div>\n  <div class='item'>3</div>\n</div>",
              "css": ".flex-root {\n  display: flex;\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n}\n.item {\n  width: 50px;\n  height: 50px;\n  background: #00d1d1;\n  margin: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #0f172a;\n  font-weight: bold;\n}",
              "js": ""
            },
            "assessment": "Explain the difference between the Main Axis and the Cross Axis."
          },
          {
            "id": "d4-t3",
            "title": "3. Flexbox Properties (Container)",
            "customComponent": "FlexboxPlayground",
            "progression": [
              {
                "level": "easy",
                "title": "Justify Content",
                "content": "This property aligns items along the Main Axis. You can center them, push them to the ends, or spread them out evenly using 'space-between'."
              },
              {
                "level": "intermediate",
                "title": "Align Items",
                "content": "This handles alignment on the Cross Axis. It's the easiest way to vertically center elements (using 'align-items: center')."
              },
              {
                "level": "advanced",
                "title": "Flex Direction",
                "content": "By default, items flow in a row. You can switch the layout to a column or even reverse the order using 'row-reverse' or 'column-reverse'."
              }
            ],
            "codeTemplate": {
              "html": "<div class='flex-container'>\n  <div class='box'>A</div>\n  <div class='box'>B</div>\n</div>",
              "css": ".flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n  background: #0f172a;\n}\n.box { background: white; padding: 20px; color: black; }",
              "js": ""
            },
            "assessment": "Use the interactive playground to find the setting that puts space between items."
          },
          {
            "id": "d4-t4",
            "title": "4. Flexbox Properties (Items)",
            "progression": [
              {
                "level": "easy",
                "title": "Flex-Grow",
                "content": "Should an item grow to fill extra space? A value of 1 means 'yes, grow!', while 0 means 'stay my size'."
              },
              {
                "level": "intermediate",
                "title": "Flex-Basis",
                "content": "This sets the initial 'starting' size of an item before the extra space is distributed. It's like a smarter version of 'width'."
              },
              {
                "level": "advanced",
                "title": "Align-Self",
                "content": "Sometimes you want one specific item to behave differently from the rest. 'Align-self' lets you override the container's vertical alignment for just that one item."
              }
            ],
            "codeTemplate": {
              "html": "<div class='container'>\n  <div class='fixed'>Fixed</div>\n  <div class='growing'>Grows</div>\n</div>",
              "css": ".container { display: flex; background: #334155; padding: 10px; }\n.fixed { width: 100px; background: #f87171; }\n.growing { flex-grow: 1; background: #4ade80; }",
              "js": ""
            },
            "assessment": "Create three items where the center item grows twice as much as the others."
          },
          {
            "id": "d4-t5",
            "title": "5. Spacing & Alignment Techniques",
            "progression": [
              {
                "level": "easy",
                "title": "The Gap Property",
                "content": "Traditionally, we used margins to separate items. Now, we use 'gap'. It's much simpler because it only adds space BETWEEN items, not on the outer edges."
              },
              {
                "level": "intermediate",
                "title": "The Margin Auto Hack",
                "content": "In Flexbox, 'margin-left: auto' will push an item to the far right. It's a powerful trick for separating navigation links from a logo."
              },
              {
                "level": "advanced",
                "title": "The Ultimate Centering",
                "content": "To perfectly center anything inside a parent, just use: 'display: flex', 'justify-content: center', and 'align-items: center'. This is the #1 most used Flexbox pattern."
              }
            ],
            "codeTemplate": {
              "html": "<div class='full-center'>\n  <div class='modal'>Perfectly Centered Content</div>\n</div>",
              "css": ".full-center {\n  height: 300px;\n  background: #1e293b;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.modal {\n  background: white;\n  padding: 40px;\n  border-radius: 20px;\n  color: #0f172a;\n}",
              "js": ""
            },
            "assessment": "Center an H1 tag both vertically and horizontally in a div that is 400px tall."
          },
          {
            "id": "d4-t6",
            "title": "6. Building Layouts with Flexbox",
            "progression": [
              {
                "level": "easy",
                "title": "Navigation Bars",
                "content": "Standard navbars have a logo on the left and links on the right. Using 'justify-content: space-between' makes this layout a breeze."
              },
              {
                "level": "intermediate",
                "title": "Sticky Footers",
                "content": "Use 'flex-direction: column' on your body and 'flex-grow: 1' on your main content to push your footer to the very bottom, even on empty pages."
              },
              {
                "level": "advanced",
                "title": "Flex Wrap & Grids",
                "content": "Flexbox usually puts everything on one line. Use 'flex-wrap: wrap' to let items fall to the next line when the screen gets narrow (great for image galleries)."
              }
            ],
            "codeTemplate": {
              "html": "<nav class='navbar'>\n  <div class='logo'>LOGO</div>\n  <ul class='links'>\n    <li>Home</li>\n    <li>Tools</li>\n    <li>Contact</li>\n  </ul>\n</nav>",
              "css": ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #0f172a;\n  padding: 1rem 2rem;\n  color: white;\n}\n.links {\n  display: flex;\n  gap: 20px;\n  list-style: none;\n}",
              "js": ""
            },
            "assessment": "Build a navigation bar with a logo and 3 links spread across the width of the page."
          },
          {
            "id": "d4-t7",
            "title": "7. Mini Project – Responsive Card Layout",
            "progression": [
              {
                "level": "easy",
                "title": "The Grid Foundation",
                "content": "Create a container with 'display: flex' and 'flex-wrap: wrap' to hold several cards."
              },
              {
                "level": "intermediate",
                "title": "Uniform Card Sizing",
                "content": "Use 'flex: 1 1 300px' on your cards. This tells them: 'try to be 300px wide, but grow and shrink to fit the containers width'."
              },
              {
                "level": "advanced",
                "title": "Interactive Polish",
                "content": "Add transitions and hover effects. Use Flexbox inside the card itself to center images and titles perfectly."
              }
            ],
            "codeTemplate": {
              "html": "<div class='grid'>\n  <div class='card'>Card 1</div>\n  <div class='card'>Card 2</div>\n  <div class='card'>Card 3</div>\n</div>",
              "css": ".grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  padding: 20px;\n}\n.card {\n  flex: 1 1 200px;\n  background: #1e293b;\n  color: #00d1d1;\n  padding: 40px;\n  border-radius: 15px;\n  text-align: center;\n  border: 1px solid #334155;\n  transition: 0.3s transform;\n}\n.card:hover {\n  transform: translateY(-5px);\n  background: #334155;\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Build a 3-column card grid that drops to 1 column on small screens using what you learned!"
          },
          {
            "id": "w1-d4-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d5",
        "dayTitle": "Day 5: Responsive Web Design",
        "topics": [
          {
            "id": "d5-t1",
            "title": "1. Introduction to Responsive Design",
            "visualization": "/res-breakpoints.png",
            "customComponent": "ResponsiveSimulator",
            "progression": [
              {
                "level": "easy",
                "title": "One Web, Many Devices",
                "content": "Responsive Design is the practice of building websites that look great on any screen size, from a tiny smartphone to a massive desktop monitor. Instead of building different sites for each, we build one site that ADAPTS."
              },
              {
                "level": "intermediate",
                "title": "The Mobile-First Approach",
                "content": "Mobile-First means designing for the smallest screen first, then adding more features and complex layouts as the screen gets larger. It's the modern industry standard because it forces you to prioritize content."
              },
              {
                "level": "advanced",
                "title": "Fluidity vs Fixedness",
                "content": "In the past, websites had 'fixed' widths (like 960px). Today, everything is fluid. We use relative units and layout systems that let content flow naturally depending on the container's size."
              }
            ],
            "codeTemplate": {
              "html": "<div class='info'>\n  <h2>Responsive News</h2>\n  <p>Resize the preview to see me adapt!</p>\n</div>",
              "css": ".info {\n  width: 90%;\n  max-width: 600px;\n  margin: auto;\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  color: white;\n}",
              "js": ""
            },
            "assessment": "Explain why current web development prefers a 'Mobile-First' approach."
          },
          {
            "id": "d5-t2",
            "title": "2. Media Queries",
            "progression": [
              {
                "level": "easy",
                "title": "The @media Rule",
                "content": "Media queries are the heart of responsive design. They allow you to apply CSS only when certain conditions are met, like 'if the screen is wider than 600px'."
              },
              {
                "level": "intermediate",
                "title": "Breakpoints",
                "content": "Breakpoints are the specific widths where your layout changes. Common ones are 768px (Tablets) and 1024px (Desktops). Use them sparingly to keep your code clean."
              },
              {
                "level": "advanced",
                "title": "Condition Combinations",
                "content": "You can combine conditions using 'and', 'not', and 'only'. For example, you can target only high-resolution screens or only devices in 'landscape' orientation."
              }
            ],
            "codeTemplate": {
              "html": "<div class='box'>I change color on Desktop!</div>",
              "css": ".box {\n  background: #f87171;\n  padding: 20px;\n  text-align: center;\n  color: white;\n}\n\n@media (min-width: 768px) {\n  .box {\n    background: #00d1d1;\n    font-size: 2rem;\n  }\n}",
              "js": ""
            },
            "assessment": "Write a media query that changes the font-size to 14px when the screen is smaller than 480px."
          },
          {
            "id": "d5-t3",
            "title": "3. Flexible Layouts",
            "progression": [
              {
                "level": "easy",
                "title": "Percentage Widths",
                "content": "Instead of 'width: 400px', use 'width: 50%'. This ensures the element always takes up half of its parent, no matter how wide the parent is."
              },
              {
                "level": "intermediate",
                "title": "Max-Width is Your Friend",
                "content": "If you set 'width: 100%' and 'max-width: 800px', the element will be fluid on small screens but stop growing once it hits 800px. This prevents text from becoming too long to read comfortably."
              },
              {
                "level": "advanced",
                "title": "The Box-Sizing Fix",
                "content": "Always use 'box-sizing: border-box'. Without it, adding padding to a 'width: 100%' element will cause it to overflow the screen. This is one of the most common responsive bugs!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='outer'>\n  <div class='inner'>I am fluid!</div>\n</div>",
              "css": ".outer { background: #334155; padding: 20px; }\n.inner {\n  width: 80%;\n  max-width: 400px;\n  background: #00d1d1;\n  margin: auto;\n  padding: 20px;\n  text-align: center;\n}",
              "js": ""
            },
            "assessment": "Create a container that takes up 90% of the screen but never exceeds 1200px."
          },
          {
            "id": "d5-t4",
            "title": "4. Responsive Images & Media",
            "visualization": "/res-images.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Golden Rule",
                "content": "To make any image responsive, simply add 'max-width: 100%' and 'height: auto'. This ensures the image never overflows its container and keeps its proportions."
              },
              {
                "level": "intermediate",
                "title": "Object-Fit",
                "content": "When you have a fixed-size container but dynamic images, use 'object-fit: cover'. It works like a background-image, cropping the photo to fill the box perfectly without stretching it."
              },
              {
                "level": "advanced",
                "title": "The Picture Element",
                "content": "Sometimes you need different images for different screens (e.g., a landscape photo for desktop and a vertical crop for mobile). The <picture> tag lets you serve different files based on media queries!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='img-frame'>\n  <img src='https://picsum.photos/800/400' alt='Responsive' class='resp-img'>\n</div>",
              "css": ".img-frame { width: 300px; height: 300px; border: 4px solid white; }\n.resp-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}",
              "js": ""
            },
            "assessment": "Render an image that occupies 100% of its parent's width but maintains its aspect ratio."
          },
          {
            "id": "d5-t5",
            "title": "5. Mobile Navigation Patterns",
            "progression": [
              {
                "level": "easy",
                "title": "The Hamburger Menu",
                "content": "On small screens, we hide the navigation links behind a 'Hamburger' icon (three line icon). This saves valuable screen space for actual content."
              },
              {
                "level": "intermediate",
                "title": "Vertical Stacking",
                "content": "The simplest mobile nav pattern is just stacking the links vertically. Use Flexbox with 'flex-direction: column' inside a media query to achieve this."
              },
              {
                "level": "advanced",
                "title": "Off-Canvas sidebars",
                "content": "Modern apps often use a sidebar that slides in from the left or right. You can build this using CSS transforms ('translateX') for high-performance animations."
              }
            ],
            "codeTemplate": {
              "html": "<nav class='mobile-friendly-nav'>\n  <div class='logo'>APP</div>\n  <div class='menu-toggle'>☰</div>\n  <ul class='nav-links'>\n    <li>Home</li>\n    <li>Gallery</li>\n  </ul>\n</nav>",
              "css": ".nav-links { display: none; }\n@media (min-width: 768px) {\n  .nav-links { display: flex; list-style: none; gap: 20px; }\n  .menu-toggle { display: none; }\n}",
              "js": ""
            },
            "assessment": "Build a navigation bar that hides its links on mobile and shows a hamburger icon instead."
          },
          {
            "id": "d5-t6",
            "title": "6. Testing Responsiveness",
            "progression": [
              {
                "level": "easy",
                "title": "Browser Dev Tools",
                "content": "Right-click any webpage and select 'Inspect'. Click the device toggle icon (next to the cursor) to simulate mobile screens directly in your browser."
              },
              {
                "level": "intermediate",
                "title": "Device Presets",
                "content": "Inside Dev Tools, you can pick specific devices like 'iPhone 14' or 'Pixel 7' to see exactly how your site looks on those specific resolutions."
              },
              {
                "level": "advanced",
                "title": "Lighthouse Insights",
                "content": "Lighthouse is a tool inside Chrome that audits your site. It will tell you if your 'Tap Targets' are too small for fingers or if your text is too tiny for mobile readers."
              }
            ],
            "codeTemplate": {
              "html": "<div class='touch-target'>Click Me!</div>",
              "css": ".touch-target {\n  background: #00d1d1;\n  padding: 10px; /* Is this too small for mobile? */\n  border-radius: 8px;\n  cursor: pointer;\n}",
              "js": ""
            },
            "assessment": "Open Dev Tools and simulate an 'iPhone SE' view. What is the screen width?"
          },
          {
            "id": "d5-t7",
            "title": "7. Mini Project – Responsive Landing Page",
            "progression": [
              {
                "level": "easy",
                "title": "The Stacked Layout",
                "content": "Create a simple landing page that stacks every section (Header, Hero, Services, Footer) vertically for mobile."
              },
              {
                "level": "intermediate",
                "title": "Expanding for Desktop",
                "content": "Add a media query for screens wider than 1024px. Change the services section from 1 column to 3 columns using Flexbox."
              },
              {
                "level": "advanced",
                "title": "Polishing UX",
                "content": "Add responsive padding that grows on larger screens, ensuring your content never feels too cramped or too spread out."
              }
            ],
            "codeTemplate": {
              "html": "<div class='landing'>\n  <section class='hero'>Responsive Hero</section>\n  <section class='grid'>\n    <div class='feat'>A</div>\n    <div class='feat'>B</div>\n    <div class='feat'>C</div>\n  </section>\n</div>",
              "css": ".landing { font-family: sans-serif; }\n.hero { height: 200px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; }\n.grid { display: flex; flex-direction: column; gap: 10px; padding: 20px; }\n.feat { background: #f1f5f9; padding: 40px; border-radius: 10px; border: 1px solid #cbd5e1; }\n\n@media (min-width: 768px) {\n  .grid { flex-direction: row; }\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Take everything you learned and build a landing page that is perfectly readable on BOTH a phone and a high-res monitor!"
          },
          {
            "id": "w1-d5-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d6",
        "dayTitle": "Day 6: Version Control & Deployment",
        "topics": [
          {
            "id": "d6-t1",
            "title": "1. Introduction to Git",
            "progression": [
              {
                "level": "easy",
                "title": "The Save Game of Coding",
                "content": "Git is a Version Control System (VCS). Think of it like a 'Save Game' feature for your code. If you make a mistake, you can 'load' an older version of your project and start over."
              },
              {
                "level": "intermediate",
                "title": "Git vs GitHub",
                "content": "Git is the tool that tracks changes on your local computer. GitHub is a website (a cloud service) where you store those changes so you can share them with others or access them from any device."
              },
              {
                "level": "advanced",
                "title": "Distributed Version Control",
                "content": "Git is 'distributed', meaning every developer has a full copy of the project's history on their machine. This makes it incredibly fast and reliable, even without an internet connection."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Git is a CLI tool, no HTML here -->\n<h1>Git is Power</h1>",
              "css": "/* Style your console in your mind */",
              "js": "// Run git commands in your terminal!"
            },
            "assessment": "Explain the difference between Git and GitHub in your own words."
          },
          {
            "id": "d6-t2",
            "title": "2. Git Basic Commands",
            "customComponent": "GitTerminal",
            "progression": [
              {
                "level": "easy",
                "title": "Starting a Repo",
                "content": "Use 'git init' to turn a normal folder into a Git Repository. This creates a hidden .git folder that starts tracking every character you type."
              },
              {
                "level": "intermediate",
                "title": "The Staging Area",
                "content": "Before you 'Save', you must pick which files to include. 'git add .' puts all your changes in the 'Staging Area' (the packing phase)."
              },
              {
                "level": "advanced",
                "title": "Commits & History",
                "content": "'git commit' is the actual save button. Every commit has a message describing what changed. Use 'git log' to see a timeline of every save you've ever made."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Open the Git Terminal below to practice -->",
              "css": "",
              "js": ""
            },
            "assessment": "Use the simulator to initialize a repo, add files, and make your first commit."
          },
          {
            "id": "d6-t3",
            "title": "3. Working with GitHub",
            "progression": [
              {
                "level": "easy",
                "title": "Pushing to the Cloud",
                "content": "To get your code onto GitHub, you 'push' it. This uploads your local commits to a 'Remote' repository."
              },
              {
                "level": "intermediate",
                "title": "Cloning Repositories",
                "content": "Want to work on an existing project? Use 'git clone [URL]'. This downloads the entire project and its history to your machine in seconds."
              },
              {
                "level": "advanced",
                "title": "SSH vs HTTPS",
                "content": "There are two ways to talk to GitHub. HTTPS uses your username/password, while SSH uses digital keys for a more secure, password-less experience."
              }
            ],
            "codeTemplate": {
              "html": "<ul>\n  <li>git clone [url]</li>\n  <li>git push origin main</li>\n  <li>git pull origin main</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Outline the steps to connect a local repository to a new repository on GitHub."
          },
          {
            "id": "d6-t4",
            "title": "4. Branching & Merging",
            "progression": [
              {
                "level": "easy",
                "title": "Parallel Universes",
                "content": "Branches let you work on a new feature in a separate 'timeline' without breaking the main code. The default branch is usually called 'main'."
              },
              {
                "level": "intermediate",
                "title": "Merging Changes",
                "content": "Once your feature is done, you 'merge' your branch back into the main branch. Git automatically combines the changes from both timelines."
              },
              {
                "level": "advanced",
                "title": "Handling Merge Conflicts",
                "content": "If two people change the same line of code, Git gets confused. This is a 'Merge Conflict'. You have to manually pick which version of the code to keep."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Commands to master -->\n<p>git checkout -b feature-dark-mode</p>\n<p>git merge feature-dark-mode</p>",
              "css": "",
              "js": ""
            },
            "assessment": "Explain how branching helps teams avoid breaking the production website."
          },
          {
            "id": "d6-t5",
            "title": "5. Collaboration Workflow",
            "progression": [
              {
                "level": "easy",
                "title": "Pull Requests (PRs)",
                "content": "On GitHub, you don't just merge code. You create a 'Pull Request'. It's a formal request to the team to review your code before it goes live."
              },
              {
                "level": "intermediate",
                "title": "Code Reviews",
                "content": "Teammates can comment on specific lines of your PR, suggesting better ways to write a function or pointing out bugs."
              },
              {
                "level": "advanced",
                "title": "Atomic Commits",
                "content": "Professional devs use 'Atomic Commits'—small, focused saves that do exactly ONE thing. This makes the project history much easier to read and debug."
              }
            ],
            "codeTemplate": {
              "html": "<h3>Commit Message Guidelines</h3>\n<ul>\n  <li>feat: add login form</li>\n  <li>fix: resolve navbar alignment</li>\n  <li>docs: update readme</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Write three examples of good commit messages following the standard convention."
          },
          {
            "id": "d6-t6",
            "title": "6. Deployment Basics",
            "progression": [
              {
                "level": "easy",
                "title": "From Local to Global",
                "content": "Deployment means taking your code from your computer and putting it on a specialized 'Web Server' so anyone with a URL can visit it."
              },
              {
                "level": "intermediate",
                "title": "Static vs Dynamic Hosting",
                "content": "Simple HTML/CSS sites are 'Static'. They can be hosted for free on services like GitHub Pages or Netlify. Apps with databases are 'Dynamic' and require more complex servers."
              },
              {
                "level": "advanced",
                "title": "Continuous Deployment (CD)",
                "content": "Modern tools can automatically deploy your site every time you 'git push'. If you update your code on GitHub, your live website updates its content automatically!"
              }
            ],
            "codeTemplate": {
              "html": "<h1>My Live Site</h1>\n<p>Hosted via Netlify CDN</p>",
              "css": "body { background: #e2e8f0; }",
              "js": ""
            },
            "assessment": "Name two popular services used for deploying modern frontend applications."
          },
          {
            "id": "d6-t7",
            "title": "7. Mini Project – Deploy Your Website",
            "progression": [
              {
                "level": "easy",
                "title": "Final Push",
                "content": "Commit all your changes from the week and push them to your GitHub repository."
              },
              {
                "level": "intermediate",
                "title": "Connecting Netlify",
                "content": "Log into Netlify/Vercel and link your GitHub account. Select your repository and hit 'Deploy'."
              },
              {
                "level": "advanced",
                "title": "Custom Domains",
                "content": "Learn how to point a custom domain (like www.yoursite.com) to your newly deployed project!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='success-badge'>Live on Netlify!</div>",
              "css": ".success-badge { padding: 20px; background: #4ade80; color: #064e3b; border-radius: 12px; font-weight: bold; }",
              "js": ""
            },
            "assessment": "Final Milestone: Push your Week 1 portfolio to GitHub and share your live Netlify URL!"
          },
          {
            "id": "w1-d6-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d7",
        "dayTitle": "Day 7: Final Project & Review",
        "topics": [
          {
            "id": "d7-t1",
            "title": "1. Revision & Concept Reinforcement",
            "progression": [
              {
                "level": "easy",
                "title": "The HTML Foundation",
                "content": "Remember: HTML is the skeleton. We use semantic tags like <header> and <main> to give meaning to our content, making it accessible to both users and search engines."
              },
              {
                "level": "intermediate",
                "title": "The CSS Skin",
                "content": "CSS is the design. We use the Box Model (Margin/Padding) to create space, and Flexbox to align elements effortlessly in rows and columns."
              },
              {
                "level": "advanced",
                "title": "The Responsive Mindset",
                "content": "Everything we build must be responsive. Use Media Queries and fluid units (%) to ensure your portfolio looks perfect on every screen from a phone to a desktop."
              }
            ],
            "codeTemplate": {
              "html": "<div class='recap'>\n  <h2>Week 1 Mastery</h2>\n  <ul>\n    <li>Semantic HTML</li>\n    <li>CSS Box Model</li>\n    <li>Flexbox Layouts</li>\n    <li>Responsive Design</li>\n    <li>Git & Deployment</li>\n  </ul>\n</div>",
              "css": ".recap {\n  background: var(--brand-gradient);\n  color: white;\n  padding: 30px;\n  border-radius: 20px;\n}\nli { margin-top: 10px; font-weight: bold; }",
              "js": ""
            },
            "assessment": "Write a short paragraph explaining how Flexbox and Media Queries work together to create responsive layouts."
          },
          {
            "id": "d7-t2",
            "title": "2. UI Planning & Layout Design",
            "customComponent": "PlanVisualizer",
            "progression": [
              {
                "level": "easy",
                "title": "Thinking in Boxes",
                "content": "Before you type a single line of code, you must plan. Wireframing is the process of sketching your layout using simple boxes. This helps you focus on structure without getting distracted by colors."
              },
              {
                "level": "intermediate",
                "title": "Layout Structuring",
                "content": "Break your design into components: Header, Hero, Services, Contact. This 'Component Thinking' makes development much easier because you can build and test one piece at a time."
              },
              {
                "level": "advanced",
                "title": "High-Fidelity Planning",
                "content": "Once the boxes are set, you add the 'Fidelity'—picking your font families, color palettes, and spacing systems. Always define your CSS variables early to keep your design consistent."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Plan your layout here using comments -->\n<!-- <header> for logo/nav -->\n<!-- <main> for content -->",
              "css": "/* Define your theme variables first! */\n:root {\n  --primary: #00d1d1;\n}",
              "js": ""
            },
            "assessment": "Sketch a simple 3-box wireframe for a personal portfolio home page."
          },
          {
            "id": "d7-t3",
            "title": "3. Combining HTML & CSS",
            "progression": [
              {
                "level": "easy",
                "title": "The Integration Phase",
                "content": "Start with a clean HTML structure. Once the content is there, link your External CSS file and begin applying your global styles (reset, fonts, colors)."
              },
              {
                "level": "intermediate",
                "title": "Class-Based Styling",
                "content": "Avoid using IDs for styling. Use reusable classes like '.card' or '.btn'. This keeps your CSS 'Dry' (Don't Repeat Yourself) and much easier to maintain."
              },
              {
                "level": "advanced",
                "title": "Z-Index & Positioning",
                "content": "When combining elements, you might need layers. Use 'position: relative' and 'z-index' to control which elements sit on top of others, especially for navigation bars."
              }
            ],
            "codeTemplate": {
              "html": "<div class='full-component'>\n  <div class='overlay'>Integrated UI</div>\n  <p>Learn to layer and style complex components.</p>\n</div>",
              "css": ".full-component {\n  position: relative;\n  background: #1e293b;\n  padding: 40px;\n  color: white;\n}\n.overlay {\n  position: absolute;\n  top: 10px; right: 10px;\n  background: var(--primary-cyan);\n  padding: 5px 10px;\n  font-size: 0.7rem;\n}",
              "js": ""
            },
            "assessment": "Build a hero section that has a background image and centered text on top of it."
          },
          {
            "id": "d7-t4",
            "title": "4. Responsive Optimization",
            "progression": [
              {
                "level": "easy",
                "title": "Finding the Breaks",
                "content": "Open your site in Dev Tools and slowly shrink the window. Whenever the layout looks 'broken' (text overflows, images get too small), that's where you need a breakpoint."
              },
              {
                "level": "intermediate",
                "title": "The Clamp Function",
                "content": "For truly fluid typography, use 'font-size: clamp(1rem, 5vw, 2rem)'. This tells the font to grow and shrink smoothly without needing dozens of media queries."
              },
              {
                "level": "advanced",
                "title": "Container Queries",
                "content": "The next level of responsive design is 'Container Queries'. Instead of looking at the screen size, elements can look at the size of their PARENT container to decide how to style themselves."
              }
            ],
            "codeTemplate": {
              "html": "<h1 class='fluid-text'>I scale perfectly!</h1>",
              "css": ".fluid-text {\n  font-size: clamp(2rem, 10vw, 5rem);\n  text-align: center;\n  color: var(--primary-cyan);\n}",
              "js": ""
            },
            "assessment": "Optimize a 4-column grid to become 2 columns on tablets and 1 column on mobile."
          },
          {
            "id": "d7-t5",
            "title": "5. Code Cleanup & Best Practices",
            "progression": [
              {
                "level": "easy",
                "title": "Naming Conventions (BEM)",
                "content": "Use BEM (Block Element Modifier) to name your classes: 'card', 'card__title', 'card__btn--active'. This makes your code readable for any developer in the world."
              },
              {
                "level": "intermediate",
                "title": "Commenting & Documentation",
                "content": "Add comments to separate sections of your CSS: /* --- HERO SECTION --- */. This helps you find code quickly when your file grows to 500+ lines."
              },
              {
                "level": "advanced",
                "title": "Removing Dead Code",
                "content": "Before you deploy, delete any unused classes and console logs. Clean code is faster to load and much easier to debug later."
              }
            ],
            "codeTemplate": {
              "html": "<div class='card card--featured'>\n  <h3 class='card__title'>Clean Code</h3>\n  <button class='card__btn'>Standardized</button>\n</div>",
              "css": "/* Component: Card */\n.card { padding: 20px; }\n.card--featured { border: 2px solid cyan; }\n.card__title { font-size: 1.2rem; }\n.card__btn { background: black; color: white; }",
              "js": ""
            },
            "assessment": "Refactor a messy piece of CSS using the BEM naming convention."
          },
          {
            "id": "d6-t6",
            "title": "6. Project Deployment Review",
            "progression": [
              {
                "level": "easy",
                "title": "Checking the Build",
                "content": "Verify that all your assets (images, icons) are showing up correctly in your local project before pushing to GitHub."
              },
              {
                "level": "intermediate",
                "title": "README Files",
                "content": "Every project needs a 'README.md' file. This describes what the project is, what tools you used, and how someone else can run it on their computer."
              },
              {
                "level": "advanced",
                "title": "Deployment Audit",
                "content": "Run your live URL through Lighthouse again. Check for any SEO issues (missing alt tags) or performance bottlenecks before sharing the link."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Checklist for Deployment -->\n<ul>\n  <li>Alt tags on images?</li>\n  <li>Fixed all links?</li>\n  <li>Cleaned up comments?</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Create a README structure for your final portfolio project."
          },
          {
            "id": "d7-t7",
            "title": "7. Final Project – Personal Portfolio Page",
            "progression": [
              {
                "level": "easy",
                "title": "The Assembly",
                "content": "Combine your About Me section, Project Grid, and Contact form into a single, cohesive HTML file."
              },
              {
                "level": "intermediate",
                "title": "Global Styling",
                "content": "Apply your premium design system. Ensure all buttons, headers, and spacing are consistent across the entire page."
              },
              {
                "level": "advanced",
                "title": "Responsiveness & Launch",
                "content": "Apply your breakpoints. Verify it works on your phone. Push to GitHub, deploy to Netlify, and celebrate your first professional web project!"
              }
            ],
            "codeTemplate": {
              "html": "<!-- YOUR COMPLETE PORTFOLIO STRUCTURE HERE -->\n<header>...</header>\n<main>\n  <section id='hero'>...</section>\n  <section id='work'>...</section>\n</main>",
              "css": "/* YOUR BRAND SYSTEM HERE */\n:root { ... }\nbody { ... }\n\n/* MEDIA QUERIES */\n@media (...) { ... }",
              "js": ""
            },
            "assessment": "The Ultimate Challenge: Build and deploy your responsive portfolio using everything you learned in Week 1!"
          },
          {
            "id": "w1-d7-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "weekId": "w2",
    "weekTitle": "Week 2: JavaScript Essentials",
    "days": [
      {
        "dayId": "w2-d1",
        "dayTitle": "Day 1: JavaScript Fundamentals",
        "topics": [
          {
            "id": "w2-d1-t1",
            "title": "1. Introduction to JavaScript",
            "customComponent": "JSRuntimeViz",
            "progression": [
              {
                "level": "easy",
                "title": "What is JavaScript?",
                "content": "JavaScript is a high-level, interpreted programming language that enables interactive web pages. While HTML provides structure and CSS provides style, JS provides the 'brain' or logic."
              },
              {
                "level": "intermediate",
                "title": "The Role in Web Development",
                "content": "JS allows you to change content dynamically, control multimedia, animate images, and much more. It's one of the three core technologies of the World Wide Web."
              },
              {
                "level": "advanced",
                "title": "The JavaScript Runtime",
                "content": "JavaScript runs in the browser's engine (like Chrome's V8). It uses an event loop to handle asynchronous tasks, making it incredibly efficient for user interactions."
              }
            ],
            "codeTemplate": {
              "html": "<h1>JS Brain Test</h1>\n<p id='message'>Static Text</p>\n<button id='action-btn'>Click to Think</button>",
              "css": "button { padding: 10px 20px; background: var(--brand-gradient); border: none; color: white; border-radius: 8px; cursor: pointer; }",
              "js": "document.getElementById('action-btn').onclick = () => {\n  document.getElementById('message').innerText = 'JavaScript just changed this text!';\n  document.getElementById('message').style.color = 'var(--primary-cyan)';\n};"
            },
            "assessment": "Explain the 'three-layer' analogy of web development (HTML, CSS, JS)."
          },
          {
            "id": "w2-d1-t2",
            "title": "2. Variables & Data Types",
            "customComponent": "DataTypeViz",
            "progression": [
              {
                "level": "easy",
                "title": "Containers for Data",
                "content": "Variables are containers for storing data values. In modern JS, we use 'let' for values that change and 'const' for values that stay the same."
              },
              {
                "level": "intermediate",
                "title": "Primitive Data Types",
                "content": "JS has several primitive types: Strings (text), Numbers (integers/decimals), Booleans (true/false), Null (empty), and Undefined (unassigned)."
              },
              {
                "level": "advanced",
                "title": "Var vs Let vs Const",
                "content": "'var' is the old way (function-scoped). 'let' and 'const' are block-scoped, which prevents many bugs related to variable leaking."
              }
            ],
            "codeTemplate": {
              "html": "<div id='output'>Check console for types!</div>",
              "css": "#output { padding: 20px; background: var(--app-card-bg); border-radius: 12px; }",
              "js": "const name = 'Alex';\nlet age = 25;\nlet isStudent = true;\n\nconsole.log(typeof name); // string\nconsole.log(typeof age);  // number\nconsole.log(typeof isStudent); // boolean"
            },
            "assessment": "Create variables for your name, age, and a boolean representing if you like coding."
          },
          {
            "id": "w2-d1-t3",
            "title": "3. Operators in JavaScript",
            "customComponent": "OperatorViz",
            "progression": [
              {
                "level": "easy",
                "title": "Arithmetic Operators",
                "content": "Used to perform math: + (addition), - (subtraction), * (multiplication), / (division), and % (remainder)."
              },
              {
                "level": "intermediate",
                "title": "Comparison Operators",
                "content": "Used to compare values: == (equal), === (strict equal), != (not equal), > (greater), < (less)."
              },
              {
                "level": "advanced",
                "title": "Logical Operators",
                "content": "Used to combine conditions: && (AND), || (OR), and ! (NOT). These are the foundation of complex decision making."
              }
            ],
            "codeTemplate": {
              "html": "<div id='calc-output'>Result: </div>",
              "css": "",
              "js": "let x = 10;\nlet y = 5;\nlet sum = x + y;\nlet isGreater = x > y;\n\ndocument.getElementById('calc-output').innerText = `Sum: ${sum}, Is X > Y? ${isGreater}`;"
            },
            "assessment": "Write a script that calculates the area of a rectangle given its width and height."
          },
          {
            "id": "w2-d1-t4",
            "title": "4. Conditional Statements",
            "customComponent": "LogicFlowViz",
            "progression": [
              {
                "level": "easy",
                "title": "If / Else",
                "content": "The if statement executes a block of code if a condition is true. The else statement handles the 'otherwise' case."
              },
              {
                "level": "intermediate",
                "title": "Else If & Nesting",
                "content": "You can chain multiple conditions using 'else if'. Nesting allows you to check conditions inside other conditions."
              },
              {
                "level": "advanced",
                "title": "The Switch Statement",
                "content": "A switch statement is a cleaner way to handle multiple specific values for a single variable, like choosing a day of the week."
              }
            ],
            "codeTemplate": {
              "html": "<input type='number' id='age-input' placeholder='Enter age'>\n<button id='check-btn'>Check Status</button>\n<p id='result'></p>",
              "css": "",
              "js": "document.getElementById('check-btn').onclick = () => {\n  const age = document.getElementById('age-input').value;\n  const result = document.getElementById('result');\n  \n  if (age >= 18) {\n    result.innerText = 'You are an adult.';\n  } else {\n    result.innerText = 'You are a minor.';\n  }\n};"
            },
            "assessment": "Write a switch statement that prints the name of a fruit based on a number (1-3)."
          },
          {
            "id": "w2-d1-t5",
            "title": "5. Loops in JavaScript",
            "customComponent": "LoopViz",
            "progression": [
              {
                "level": "easy",
                "title": "The For Loop",
                "content": "For loops are used when you know exactly how many times you want to repeat a task. It has three parts: init, condition, and increment."
              },
              {
                "level": "intermediate",
                "title": "While Loops",
                "content": "While loops repeat as long as a condition remains true. Be careful of 'infinite loops' that never stop!"
              },
              {
                "level": "advanced",
                "title": "Do-While & Break",
                "content": "Do-while ensures the code runs at least ONCE. 'break' and 'continue' allow you to exit or skip iterations early."
              }
            ],
            "codeTemplate": {
              "html": "<div id='loop-output'></div>",
              "css": "",
              "js": "let output = '';\nfor (let i = 1; i <= 5; i++) {\n  output += `Count: ${i} <br>`;\n}\ndocument.getElementById('loop-output').innerHTML = output;"
            },
            "assessment": "Create a loop that prints only even numbers from 1 to 20."
          },
          {
            "id": "w2-d1-t6",
            "title": "6. Input & Output Basics",
            "customComponent": "InputOutputViz",
            "progression": [
              {
                "level": "easy",
                "title": "Console Logging",
                "content": "console.log() is a developer's best friend. it prints messages to the browser console for debugging."
              },
              {
                "level": "intermediate",
                "title": "Alerts & Confirms",
                "content": "alert() pops up a message. confirm() asks for a Yes/No answer. These are simple but can be annoying to users."
              },
              {
                "level": "advanced",
                "title": "Prompt Basics",
                "content": "prompt() allows you to collect text input from the user via a popup window. Note: the data returned is always a string!"
              }
            ],
            "codeTemplate": {
              "html": "<button id='greet-btn'>Say Hello</button>",
              "css": "",
              "js": "document.getElementById('greet-btn').onclick = () => {\n  const name = prompt('What is your name?');\n  if (name) {\n    alert(`Hello, ${name}! Welcome to JS.`);\n  }\n};"
            },
            "assessment": "Use prompt to ask for two numbers and alert their sum."
          },
          {
            "id": "w2-d1-t7",
            "title": "7. Mini Task – Simple Calculator Logic",
            "customComponent": "CalculatorTaskViz",
            "progression": [
              {
                "level": "easy",
                "title": "The Logic Plan",
                "content": "We need to take two numbers and an operator, then perform the correct math based on that operator."
              },
              {
                "level": "intermediate",
                "title": "Building the Engine",
                "content": "Using an if-else chain or switch statement to handle +, -, *, and / cases."
              },
              {
                "level": "advanced",
                "title": "Handling Errors",
                "content": "What happens if a user tries to divide by zero? A good developer anticipates and handles these edge cases."
              }
            ],
            "codeTemplate": {
              "html": "<div class='mini-calc'>\n  <input type='number' id='n1'>\n  <select id='op'>\n    <option value='+'>+</option>\n    <option value='-'>-</option>\n    <option value='*'>*</option>\n    <option value='/'>/</option>\n  </select>\n  <input type='number' id='n2'>\n  <button id='calc-btn'>=</button>\n  <span id='res'></span>\n</div>",
              "css": ".mini-calc { display: flex; gap: 10px; align-items: center; }",
              "js": "document.getElementById('calc-btn').onclick = () => {\n  const n1 = parseFloat(document.getElementById('n1').value);\n  const n2 = parseFloat(document.getElementById('n2').value);\n  const op = document.getElementById('op').value;\n  const res = document.getElementById('res');\n  \n  let result;\n  switch(op) {\n    case '+': result = n1 + n2; break;\n    case '-': result = n1 - n2; break;\n    case '*': result = n1 * n2; break;\n    case '/': result = n2 !== 0 ? n1 / n2 : 'Error'; break;\n  }\n  res.innerText = result;\n};"
            },
            "assessment": "Build a calculator that also handles exponents (**)."
          },
          {
            "id": "w2-d1-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d2",
        "dayTitle": "Day 2: Functions, Scope & Arrays",
        "topics": [
          {
            "id": "w2-d2-t1",
            "title": "1. Functions in JavaScript",
            "visualization": "/js-functions.png",
            "progression": [
              {
                "level": "easy",
                "title": "Reusable Logic",
                "content": "Functions are blocks of code designed to perform a particular task. They help you write code once and use it many times."
              },
              {
                "level": "intermediate",
                "title": "Parameters & Arguments",
                "content": "Parameters are placeholders in the function definition. Arguments are the actual values passed to the function when it's called."
              },
              {
                "level": "advanced",
                "title": "The Return Statement",
                "content": "The 'return' statement stops the function and sends a value back to the caller. Without it, functions return 'undefined' by default."
              }
            ],
            "codeTemplate": {
              "html": "<div id='func-out'>Result: </div>",
              "css": "",
              "js": "function add(a, b) {\n  return a + b;\n}\n\nconst sum = add(10, 20);\ndocument.getElementById('func-out').innerText = `Sum: ${sum}`;"
            },
            "assessment": "Write a function called 'greet' that takes a name and returns 'Hello [name]!'."
          },
          {
            "id": "w2-d2-t2",
            "title": "2. Function Expressions & Arrow Functions",
            "visualization": "/js-arrow.png",
            "progression": [
              {
                "level": "easy",
                "title": "Function Expressions",
                "content": "A function can also be stored in a variable. This is called a function expression. They are not hoisted like declarations!"
              },
              {
                "level": "intermediate",
                "title": "The Arrow Syntax",
                "content": "ES6 introduced arrow functions (=>). They are shorter and handled differently with 'this' context."
              },
              {
                "level": "advanced",
                "title": "Implicit Returns",
                "content": "If an arrow function has only one line, you can omit the curly braces and the 'return' keyword for an implicit return."
              }
            ],
            "codeTemplate": {
              "html": "<div id='arrow-out'>Squared: </div>",
              "css": "",
              "js": "const square = n => n * n;\n\ndocument.getElementById('arrow-out').innerText += square(5);"
            },
            "assessment": "Convert a standard function declaration into a one-line arrow function."
          },
          {
            "id": "w2-d2-t3",
            "title": "3. Scope & Hoisting",
            "customComponent": "ScopeHoistingViz",
            "progression": [
              {
                "level": "easy",
                "title": "Global vs Local Scope",
                "content": "Variables declared outside a function are Global. Variables declared inside are Local (only accessible within that function)."
              },
              {
                "level": "intermediate",
                "title": "Block Scope",
                "content": "'let' and 'const' provide block scope (inside {}). 'var' does not, which can lead to unexpected behavior in loops."
              },
              {
                "level": "advanced",
                "title": "Understanding Hoisting",
                "content": "JS moves declarations to the top of their scope. Standard functions are fully hoisted, but 'let' and 'const' variables are not accessible until their line is reached."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console to see scope errors!</p>",
              "css": "",
              "js": "if (true) {\n  var globalish = 'I am var';\n  let localOnly = 'I am let';\n}\nconsole.log(globalish); // Works\nconsole.log(localOnly);  // Error!"
            },
            "assessment": "Explain why using 'let' is generally safer than using 'var' for loop counters."
          },
          {
            "id": "w2-d2-t4",
            "title": "4. Arrays in JavaScript",
            "customComponent": "ArrayMethodsViz",
            "progression": [
              {
                "level": "easy",
                "title": "Collections of Data",
                "content": "An array is an ordered list of values. You can store strings, numbers, or even other arrays inside one."
              },
              {
                "level": "intermediate",
                "title": "Zero-Based Indexing",
                "content": "The first item in an array is at index 0. To get the third item, you use array[2]."
              },
              {
                "level": "advanced",
                "title": "The Length Property",
                "content": "array.length always tells you how many items are in the array. It's automatically updated when you add or remove items."
              }
            ],
            "codeTemplate": {
              "html": "<div id='array-out'>First Fruit: </div>",
              "css": "",
              "js": "const fruits = ['Apple', 'Banana', 'Cherry'];\ndocument.getElementById('array-out').innerText += fruits[0];\nconsole.log(fruits.length); // 3"
            },
            "assessment": "Create an array of your top 3 favorite colors and print the second one."
          },
          {
            "id": "w2-d2-t5",
            "title": "5. Array Methods",
            "visualization": "/js-array-methods.png",
            "progression": [
              {
                "level": "easy",
                "title": "Adding & Removing",
                "content": "push() adds to the end, pop() removes from the end. unshift() and shift() do the same for the beginning."
              },
              {
                "level": "intermediate",
                "title": "Map & Filter",
                "content": "map() creates a NEW array by transforming every item. filter() creates a NEW array with only items that match a condition."
              },
              {
                "level": "advanced",
                "title": "forEach vs Map",
                "content": "forEach() is for looping/performing actions. map() is for transforming data. Choosing the right one makes your code cleaner."
              }
            ],
            "codeTemplate": {
              "html": "<ul id='fruit-list'></ul>",
              "css": "",
              "js": "const fruits = ['apple', 'banana', 'orange'];\nconst upperFruits = fruits.map(f => f.toUpperCase());\n\nconst list = document.getElementById('fruit-list');\nupperFruits.forEach(f => {\n  const li = document.createElement('li');\n  li.innerText = f;\n  list.appendChild(li);\n});"
            },
            "assessment": "Take an array of numbers and use filter to get only numbers greater than 10."
          },
          {
            "id": "w2-d2-t6",
            "title": "6. Objects in JavaScript",
            "visualization": "/js-objects.png",
            "progression": [
              {
                "level": "easy",
                "title": "Key-Value Pairs",
                "content": "Objects store data as properties (keys) and values. They are perfect for representing real-world things like a User or a Product."
              },
              {
                "level": "intermediate",
                "title": "Dot vs Bracket Notation",
                "content": "Use dot notation (user.name) for simple access. Use brackets (user['name']) if the property name is stored in a variable."
              },
              {
                "level": "advanced",
                "title": "Methods & 'this'",
                "content": "Functions stored inside objects are called Methods. They often use the 'this' keyword to refer to the object itself."
              }
            ],
            "codeTemplate": {
              "html": "<div id='obj-out'></div>",
              "css": "",
              "js": "const user = {\n  name: 'Alex',\n  role: 'Admin',\n  greet: function() {\n    return `Welcome, ${this.name}!`;\n  }\n};\n\ndocument.getElementById('obj-out').innerText = user.greet();"
            },
            "assessment": "Create a 'car' object with properties like make, model, and a method that returns a full description."
          },
          {
            "id": "w2-d2-t7",
            "title": "7. Mini Task – Student Data Manager",
            "visualization": "/js-manager.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Data Structure",
                "content": "Create an array of 'Student' objects, each with a name, grade, and attendance status."
              },
              {
                "level": "intermediate",
                "title": "Filtering Results",
                "content": "Write a function that filters students who have a grade above 80."
              },
              {
                "level": "advanced",
                "title": "Dynamic Updates",
                "content": "Add a method to your manager that allows you to add a new student or update an existing one's grade."
              }
            ],
            "codeTemplate": {
              "html": "<div id='manager-out'></div>\n<button id='pass-btn'>Show Passing Students</button>",
              "css": "",
              "js": "const students = [\n  { name: 'John', grade: 75 },\n  { name: 'Sarah', grade: 90 },\n  { name: 'Alex', grade: 85 }\n];\n\nconst display = (arr) => {\n  document.getElementById('manager-out').innerHTML = \n    arr.map(s => `<p>${s.name}: ${s.grade}</p>`).join('');\n};\n\ndisplay(students);\n\ndocument.getElementById('pass-btn').onclick = () => {\n  const passing = students.filter(s => s.grade > 80);\n  display(passing);\n};"
            },
            "assessment": "Extend the manager to calculate the average grade of all students."
          },
          {
            "id": "w2-d2-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d3",
        "dayTitle": "Day 3: DOM & Interactivity",
        "topics": [
          {
            "id": "w2-d3-t1",
            "title": "1. DOM Introduction",
            "customComponent": "DOMTreeViz",
            "progression": [
              {
                "level": "easy",
                "title": "The Document Object Model",
                "content": "The DOM is a programming interface for web documents. It represents the page as a 'tree' of objects that JavaScript can manipulate."
              },
              {
                "level": "intermediate",
                "title": "JS Meets HTML",
                "content": "When a web page is loaded, the browser creates a DOM. JavaScript uses this tree to change text, colors, and structure dynamically."
              },
              {
                "level": "advanced",
                "title": "The window and document Objects",
                "content": "'window' represents the browser window. 'document' is the root of the page structure. Together, they allow you to control everything from URL info to button clicks."
              }
            ],
            "codeTemplate": {
              "html": "<h1>Inspect the DOM!</h1>\n<p>Everything you see is a node in the DOM tree.</p>",
              "css": "",
              "js": "console.log(document); // The entire HTML document\nconsole.log(document.body); // Just the body element"
            },
            "assessment": "Describe how the browser represents an HTML <div> as a DOM node."
          },
          {
            "id": "w2-d3-t2",
            "title": "2. DOM Selectors",
            "visualization": "/js-dom-selectors.png",
            "progression": [
              {
                "level": "easy",
                "title": "Selecting by ID",
                "content": "getElementById() is the fastest way to target a single, unique element. Just pass the ID string (without the #)!"
              },
              {
                "level": "intermediate",
                "title": "The Modern querySelector",
                "content": "querySelector() uses CSS syntax. You can target IDs (#myId), Classes (.myClass), or even complex combinations like 'div > p'."
              },
              {
                "level": "advanced",
                "title": "Selecting Multiple Elements",
                "content": "querySelectorAll() returns a NodeList of ALL matching elements. You can loop through them using .forEach() to apply changes to many items at once."
              }
            ],
            "codeTemplate": {
              "html": "<div id='target'>Target Me</div>\n<p class='text'>Paragraph 1</p>\n<p class='text'>Paragraph 2</p>",
              "css": ".highlight { color: var(--primary-cyan); font-weight: bold; }",
              "js": "const single = document.getElementById('target');\nsingle.innerText = 'Found You!';\n\nconst allPara = document.querySelectorAll('.text');\nallPara.forEach(p => p.classList.add('highlight'));"
            },
            "assessment": "Write a selector that targets a button inside a div with the class 'container'."
          },
          {
            "id": "w2-d3-t3",
            "title": "3. Modifying Elements",
            "visualization": "/js-modify.png",
            "progression": [
              {
                "level": "easy",
                "title": "Changing Content",
                "content": "Use .innerText for text content and .innerHTML if you need to add HTML tags inside an element."
              },
              {
                "level": "intermediate",
                "title": "Styling via JS",
                "content": "You can change CSS directly using .style (e.g., el.style.color = 'red'). However, it's often better to toggle classes using .classList."
              },
              {
                "level": "advanced",
                "title": "Attributes & Values",
                "content": "Use setAttribute() and getAttribute() to change things like image sources (src), link destinations (href), or input values."
              }
            ],
            "codeTemplate": {
              "html": "<div id='box'>Change My Style</div>\n<button id='toggle-btn'>Toggle Glow</button>",
              "css": ".glow { box-shadow: var(--glow); border-color: var(--primary-cyan); }\n#box { padding: 20px; border: 1px solid #ccc; transition: all 0.3s; }",
              "js": "const box = document.getElementById('box');\nconst btn = document.getElementById('toggle-btn');\n\nbtn.onclick = () => {\n  box.classList.toggle('glow');\n  box.innerText = box.classList.contains('glow') ? 'GLOWING' : 'OFF';\n};"
            },
            "assessment": "Create a script that changes an image source when a button is clicked."
          },
          {
            "id": "w2-d3-t4",
            "title": "4. Event Handling",
            "visualization": "/js-events.png",
            "progression": [
              {
                "level": "easy",
                "title": "What are Events?",
                "content": "Events are 'signals' that something has happened (click, scroll, key press). JS listens for these signals to run code."
              },
              {
                "level": "intermediate",
                "title": "addEventListener",
                "content": "This is the professional way to handle events. It allows you to add multiple listeners to one element without overwriting existing ones."
              },
              {
                "level": "advanced",
                "title": "The Event Object",
                "content": "When an event triggers, JS passes an 'event' object to your function. It contains useful info like which key was pressed or the mouse coordinates."
              }
            ],
            "codeTemplate": {
              "html": "<button id='evt-btn'>Click Me</button>\n<p id='coords'>Coords: 0, 0</p>",
              "css": "",
              "js": "const btn = document.getElementById('evt-btn');\n\nbtn.addEventListener('click', (e) => {\n  alert('Button clicked!');\n  console.log(e); // Inspect this in the console!\n});\n\nwindow.addEventListener('mousemove', (e) => {\n  document.getElementById('coords').innerText = `Coords: ${e.clientX}, ${e.clientY}`;\n});"
            },
            "assessment": "Add a 'keyup' listener to an input field and print the value to the console."
          },
          {
            "id": "w2-d3-t5",
            "title": "5. Form Handling with JavaScript",
            "visualization": "/js-form-handle.png",
            "progression": [
              {
                "level": "easy",
                "title": "Preventing Default Behavior",
                "content": "Forms naturally refresh the page when submitted. In modern apps, we use e.preventDefault() to stop this so we can handle the data with JS."
              },
              {
                "level": "intermediate",
                "title": "Capturing Input Values",
                "content": "Target input elements and use their .value property to get what the user typed."
              },
              {
                "level": "advanced",
                "title": "Real-time Validation",
                "content": "Use 'input' or 'change' events to check data while the user is typing, providing instant feedback (like showing a red border for invalid emails)."
              }
            ],
            "codeTemplate": {
              "html": "<form id='login-form'>\n  <input type='text' id='user' placeholder='Username' required>\n  <button type='submit'>Login</button>\n</form>\n<p id='feedback'></p>",
              "css": ".error { color: #f87171; }",
              "js": "const form = document.getElementById('login-form');\nconst feedback = document.getElementById('feedback');\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const username = document.getElementById('user').value;\n  \n  if (username.length < 3) {\n    feedback.innerText = 'Username too short!';\n    feedback.className = 'error';\n  } else {\n    feedback.innerText = `Welcome, ${username}!`;\n    feedback.className = '';\n  }\n});"
            },
            "assessment": "Build a form that takes two passwords and alerts the user if they don't match."
          },
          {
            "id": "w2-d3-t6",
            "title": "6. Dynamic Content Rendering",
            "visualization": "/js-dynamic.png",
            "progression": [
              {
                "level": "easy",
                "title": "Creating Elements",
                "content": "document.createElement() creates a new HTML tag in memory. It's not on the page until you append it!"
              },
              {
                "level": "intermediate",
                "title": "Appending & Removing",
                "content": "Use .appendChild() to add a child to a parent. Use .remove() to delete an element from the page."
              },
              {
                "level": "advanced",
                "title": "Efficient Lists",
                "content": "Instead of adding items one by one, you can build a long string of HTML and set it as innerHTML once, or use 'fragments' for better performance."
              }
            ],
            "codeTemplate": {
              "html": "<button id='add-btn'>Add Item</button>\n<ul id='dynamic-list'></ul>",
              "css": "li { padding: 8px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; }",
              "js": "const btn = document.getElementById('add-btn');\nconst list = document.getElementById('dynamic-list');\n\nbtn.onclick = () => {\n  const li = document.createElement('li');\n  li.innerHTML = `New Item ${list.children.length + 1} <button class='del-btn'>X</button>`;\n  \n  li.querySelector('.del-btn').onclick = () => li.remove();\n  \n  list.appendChild(li);\n};"
            },
            "assessment": "Write a script that generates a 3x3 grid of colored squares dynamically."
          },
          {
            "id": "w2-d3-t7",
            "title": "7. Mini Project – Interactive To-Do List",
            "visualization": "/js-todo.png",
            "progression": [
              {
                "level": "easy",
                "title": "Adding Tasks",
                "content": "Capture the input value and create a new list item when the user clicks 'Add'."
              },
              {
                "level": "intermediate",
                "title": "Task Actions",
                "content": "Add buttons to every task to mark them as 'Complete' (striking through text) or 'Delete' (removing the node)."
              },
              {
                "level": "advanced",
                "title": "Persistence & UX",
                "content": "Clear the input field after adding, and prevent adding empty tasks. (Bonus: Try to save them to LocalStorage so they stay after refresh!)"
              }
            ],
            "codeTemplate": {
              "html": "<div class='todo-app'>\n  <input type='text' id='todo-in' placeholder='What needs to be done?'>\n  <button id='add-todo'>Add</button>\n  <ul id='todo-list'></ul>\n</div>",
              "css": ".done { text-decoration: line-through; opacity: 0.5; }",
              "js": "const input = document.getElementById('todo-in');\nconst addBtn = document.getElementById('add-todo');\nconst list = document.getElementById('todo-list');\n\naddBtn.onclick = () => {\n  if (!input.value) return;\n  \n  const li = document.createElement('li');\n  li.innerHTML = `\n    <span>${input.value}</span>\n    <button class='done-btn'>✓</button>\n    <button class='del-btn'>✕</button>\n  `;\n  \n  li.querySelector('.done-btn').onclick = () => li.classList.toggle('done');\n  li.querySelector('.del-btn').onclick = () => li.remove();\n  \n  list.appendChild(li);\n  input.value = '';\n};"
            },
            "assessment": "Final Challenge: Build the To-Do app and add a 'Clear All' button."
          },
          {
            "id": "w2-d3-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d4",
        "dayTitle": "Day 4: Advanced JS & Async",
        "topics": [
          {
            "id": "w2-d4-t1",
            "title": "1. Advanced JavaScript Concepts",
            "customComponent": "JSRuntimeViz",
            "progression": [
              {
                "level": "easy",
                "title": "Execution Context",
                "content": "Everything in JS happens inside an 'Execution Context'. It's like a box where all your code is evaluated and executed."
              },
              {
                "level": "intermediate",
                "title": "The Call Stack",
                "content": "The Call Stack is a mechanism JS uses to keep track of its place in a script that calls multiple functions. It's 'Last In, First Out' (LIFO)."
              },
              {
                "level": "advanced",
                "title": "Memory Heap",
                "content": "Variables and objects are stored in the Memory Heap. Understanding how memory is allocated and cleaned up (Garbage Collection) helps prevent performance leaks."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for the stack trace!</p>",
              "css": "",
              "js": "function first() {\n  console.log('Inside first');\n  second();\n}\nfunction second() {\n  console.log('Inside second');\n  console.trace(); // Shows the current call stack\n}\nfirst();"
            },
            "assessment": "Describe what happens to the Call Stack when a function returns."
          },
          {
            "id": "w2-d4-t2",
            "title": "2. Closures in JavaScript",
            "visualization": "/js-closures.png",
            "progression": [
              {
                "level": "easy",
                "title": "Functions with Memory",
                "content": "A closure is the combination of a function and the lexical environment within which that function was declared."
              },
              {
                "level": "intermediate",
                "title": "Retaining Access",
                "content": "Closures allow a function to access variables from an enclosing scope even after the outer function has finished executing."
              },
              {
                "level": "advanced",
                "title": "Private Variables",
                "content": "Closures are often used to create 'private' variables that cannot be accessed or modified from outside the function, providing data security."
              }
            ],
            "codeTemplate": {
              "html": "<button id='counter-btn'>Click to Count</button>\n<p id='count-out'>0</p>",
              "css": "",
              "js": "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\ndocument.getElementById('counter-btn').onclick = () => {\n  document.getElementById('count-out').innerText = counter();\n};"
            },
            "assessment": "Explain why the 'count' variable in the example above is not accessible globally."
          },
          {
            "id": "w2-d4-t3",
            "title": "3. Callbacks & Higher-Order Functions",
            "visualization": "/js-higher-order.png",
            "progression": [
              {
                "level": "easy",
                "title": "Higher-Order Functions",
                "content": "A function that takes another function as an argument or returns a function is called a Higher-Order Function."
              },
              {
                "level": "intermediate",
                "title": "Callback Functions",
                "content": "A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some action."
              },
              {
                "level": "advanced",
                "title": "Dynamic Logic",
                "content": "Callbacks allow you to write highly reusable code where the specific behavior can be decided at the moment the function is called."
              }
            ],
            "codeTemplate": {
              "html": "<div id='ho-out'></div>",
              "css": "",
              "js": "function process(n, callback) {\n  return callback(n);\n}\n\nconst double = x => x * 2;\nconst triple = x => x * 3;\n\ndocument.getElementById('ho-out').innerHTML = `\n  Double 5: ${process(5, double)} <br>\n  Triple 5: ${process(5, triple)}\n`;"
            },
            "assessment": "Write a higher-order function that takes a number and a function, then applies that function twice."
          },
          {
            "id": "w2-d4-t4",
            "title": "4. Asynchronous JavaScript",
            "visualization": "/js-async.png",
            "progression": [
              {
                "level": "easy",
                "title": "Blocking vs Non-blocking",
                "content": "Synchronous code runs line-by-line, blocking the next line until the current one finishes. Asynchronous code allows tasks to run in the background."
              },
              {
                "level": "intermediate",
                "title": "The Event Loop",
                "content": "The Event Loop manages the execution of multiple scripts. It continuously checks the Call Stack and the Callback Queue to keep the app responsive."
              },
              {
                "level": "advanced",
                "title": "Why Async Matters",
                "content": "Without async, your website would 'freeze' every time it fetches data or waits for a timer, leading to a terrible user experience."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the timing in the console!</p>",
              "css": "",
              "js": "console.log('1. Start');\nsetTimeout(() => {\n  console.log('2. Async Task (after 1s)');\n}, 1000);\nconsole.log('3. End');"
            },
            "assessment": "Predict the order of logs in the example above and explain why."
          },
          {
            "id": "w2-d4-t5",
            "title": "5. Promises",
            "customComponent": "PromiseFlowViz",
            "progression": [
              {
                "level": "easy",
                "title": "A Future Value",
                "content": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value."
              },
              {
                "level": "intermediate",
                "title": "Promise States",
                "content": "A promise is either Pending (starting), Fulfilled (success), or Rejected (error). You handle these using .then() and .catch()."
              },
              {
                "level": "advanced",
                "title": "Chaining Promises",
                "content": "You can chain multiple .then() calls to perform sequential async tasks, avoiding the 'Callback Hell' of nested functions."
              }
            ],
            "codeTemplate": {
              "html": "<p id='promise-status'>Waiting for promise...</p>",
              "css": "",
              "js": "const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Promise Resolved! ✅'), 2000);\n});\n\nmyPromise\n  .then(val => document.getElementById('promise-status').innerText = val)\n  .catch(err => console.error(err));"
            },
            "assessment": "Create a promise that rejects after 1 second and handle the error using .catch()."
          },
          {
            "id": "w2-d4-t6",
            "title": "6. Async/Await",
            "visualization": "/js-async-await.png",
            "progression": [
              {
                "level": "easy",
                "title": "Cleaner Async Code",
                "content": "Async/Await is 'syntactic sugar' for Promises. It makes asynchronous code look and behave like synchronous code."
              },
              {
                "level": "intermediate",
                "title": "The 'await' Keyword",
                "content": "The 'await' keyword can only be used inside 'async' functions. It pauses the function execution until the promise is settled."
              },
              {
                "level": "advanced",
                "title": "Error Handling (Try/Catch)",
                "content": "When using async/await, we use standard try/catch blocks to handle errors, making the code much more readable than .catch() chains."
              }
            ],
            "codeTemplate": {
              "html": "<p id='async-out'>Loading...</p>",
              "css": "",
              "js": "async function getData() {\n  try {\n    const response = await new Promise(res => setTimeout(() => res('Data Found!'), 1500));\n    document.getElementById('async-out').innerText = response;\n  } catch (error) {\n    document.getElementById('async-out').innerText = 'Error!';\n  }\n}\ngetData();"
            },
            "assessment": "Convert a .then() chain into an async/await function."
          },
          {
            "id": "w2-d4-t7",
            "title": "7. Mini Project – API Data Fetcher",
            "visualization": "/js-api.png",
            "progression": [
              {
                "level": "easy",
                "title": "Introduction to Fetch",
                "content": "The Fetch API provides an easy, logical way to fetch resources asynchronously across the network."
              },
              {
                "level": "intermediate",
                "title": "JSON Parsing",
                "content": "API responses are usually in JSON format. We use .json() to convert them into JavaScript objects we can use."
              },
              {
                "level": "advanced",
                "title": "Live Rendering",
                "content": "Combine fetch with DOM manipulation to build a dynamic UI that displays live data from an external server (like user lists or weather info)."
              }
            ],
            "codeTemplate": {
              "html": "<div class='api-app'>\n  <button id='fetch-users'>Fetch Random User</button>\n  <div id='user-display' style='margin-top: 20px;'></div>\n</div>",
              "css": ".user-card { padding: 15px; background: var(--app-card-bg); border-radius: 12px; border: 1px solid var(--app-border); }",
              "js": "const btn = document.getElementById('fetch-users');\nconst display = document.getElementById('user-display');\n\nbtn.onclick = async () => {\n  display.innerText = 'Fetching...';\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const user = await res.json();\n    display.innerHTML = `\n      <div class='user-card'>\n        <h3>${user.name}</h3>\n        <p>Email: ${user.email}</p>\n        <p>City: ${user.address.city}</p>\n      </div>\n    `;\n  } catch (err) {\n    display.innerText = 'Failed to load user.';\n  }\n};"
            },
            "assessment": "Final Challenge: Modify the fetcher to display the user's company name and phone number."
          },
          {
            "id": "w2-d4-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d5",
        "dayTitle": "Day 5: ES6+ & Storage",
        "topics": [
          {
            "id": "w2-d5-t1",
            "title": "1. ES6+ Features Overview",
            "visualization": "/js-es6.png",
            "progression": [
              {
                "level": "easy",
                "title": "Modern JavaScript",
                "content": "ES6 (ECMAScript 2015) was a major update that introduced many features we use today in React, like arrow functions, classes, and better variable scoping."
              },
              {
                "level": "intermediate",
                "title": "Syntactic Sugar",
                "content": "Most ES6 features are 'syntactic sugar' - they don't change what JS can do, but they make the code much cleaner and easier to read/write."
              },
              {
                "level": "advanced",
                "title": "The Evolution of JS",
                "content": "Since ES6, new features are added every year (ES7, ES8, etc.), including async/await, optional chaining, and nullish coalescing, keeping JS modern and powerful."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for modern JS output!</p>",
              "css": "",
              "js": "// Modern features in action\nconst greet = (name = 'Guest') => `Hello, ${name}!`;\nconsole.log(greet('Developer'));"
            },
            "assessment": "List three ES6 features that improved JavaScript development."
          },
          {
            "id": "w2-d5-t2",
            "title": "2. Destructuring",
            "visualization": "/js-destructuring.png",
            "progression": [
              {
                "level": "easy",
                "title": "Extracting Data",
                "content": "Destructuring allows you to unpack values from arrays or properties from objects into distinct variables in a single line."
              },
              {
                "level": "intermediate",
                "title": "Object Destructuring",
                "content": "Instead of writing user.name and user.age multiple times, you can write { name, age } = user to get direct access to those properties."
              },
              {
                "level": "advanced",
                "title": "Renaming & Defaults",
                "content": "You can rename variables during destructuring ({ name: userName }) and set default values in case a property is missing ({ role = 'user' })."
              }
            ],
            "codeTemplate": {
              "html": "<div id='destruct-out'></div>",
              "css": "",
              "js": "const user = { name: 'Alex', age: 28, city: 'London' };\nconst { name, city } = user;\n\nconst colors = ['Red', 'Green', 'Blue'];\nconst [primary] = colors;\n\ndocument.getElementById('destruct-out').innerHTML = `\n  User: ${name} from ${city} <br>\n  First Color: ${primary}\n`;"
            },
            "assessment": "Destructure a nested object containing a user's address (street, zip) into variables."
          },
          {
            "id": "w2-d5-t3",
            "title": "3. Spread & Rest Operators",
            "visualization": "/js-spread.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Three Dots (...)",
                "content": "The triple dot operator (...) can be used as either Spread (expanding values) or Rest (collecting values) depending on the context."
              },
              {
                "level": "intermediate",
                "title": "Spread for Copying",
                "content": "Spread allows you to quickly copy an array or merge two objects without affecting the original ones. This is crucial for state management in React."
              },
              {
                "level": "advanced",
                "title": "Rest for Arguments",
                "content": "Rest parameters allow a function to accept an indefinite number of arguments as an array, making your functions highly flexible."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for merged data!</p>",
              "css": "",
              "js": "const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4]; // Spread\n\nfunction sum(...numbers) { // Rest\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\n\nconsole.log(arr2);\nconsole.log(sum(10, 20, 30));"
            },
            "assessment": "Merge two objects 'profile' and 'settings' using the spread operator."
          },
          {
            "id": "w2-d5-t4",
            "title": "4. Template Literals",
            "visualization": "/js-templates.png",
            "progression": [
              {
                "level": "easy",
                "title": "Backticks & Variables",
                "content": "Template literals use backticks (`) instead of quotes. They allow you to embed variables directly using the ${variable} syntax."
              },
              {
                "level": "intermediate",
                "title": "Multiline Strings",
                "content": "Before ES6, multiline strings were messy. With template literals, you just press Enter, and the line breaks are preserved automatically."
              },
              {
                "level": "advanced",
                "title": "Expression Interpolation",
                "content": "You can perform any JS expression inside the ${}, like math operations or function calls, making string building extremely dynamic."
              }
            ],
            "codeTemplate": {
              "html": "<div id='tpl-out'></div>",
              "css": "",
              "js": "const item = 'Keyboard';\nconst price = 50;\nconst qty = 2;\n\nconst message = `\n  <div style='border: 1px solid var(--primary-cyan); padding: 10px;'>\n    <h3>Receipt</h3>\n    <p>Product: ${item}</p>\n    <p>Total: $${price * qty}</p>\n  </div>\n`;\n\ndocument.getElementById('tpl-out').innerHTML = message;"
            },
            "assessment": "Create a multiline string that displays a user's full profile info using template literals."
          },
          {
            "id": "w2-d5-t5",
            "title": "5. Modules in JavaScript",
            "visualization": "/js-modules.png",
            "progression": [
              {
                "level": "easy",
                "title": "Modular Code",
                "content": "Modules allow you to break your code into separate files. This makes large projects manageable, organized, and searchable."
              },
              {
                "level": "intermediate",
                "title": "Export & Import",
                "content": "Use 'export' to make functions or variables available to other files, and 'import' to bring them into your current file."
              },
              {
                "level": "advanced",
                "title": "Default vs Named Exports",
                "content": "Named exports allow multiple items per file. Default exports are for the main item in a file. Knowing when to use each is key to clean architecture."
              }
            ],
            "codeTemplate": {
              "html": "<p>Note: Modules usually require a server environment to work in browsers!</p>",
              "css": "",
              "js": "// Example syntax (conceptual):\n// utils.js: export const add = (a, b) => a + b;\n// app.js:   import { add } from './utils.js';"
            },
            "assessment": "Explain the difference between 'import { x }' and 'import x'."
          },
          {
            "id": "w2-d5-t6",
            "title": "6. Local Storage & Session Storage",
            "customComponent": "StorageManagerViz",
            "progression": [
              {
                "level": "easy",
                "title": "Browser Persistence",
                "content": "Local Storage allows you to save small amounts of data in the browser that stay even after you close the tab or restart the computer."
              },
              {
                "level": "intermediate",
                "title": "Key-Value Pairs",
                "content": "Data is stored as strings. Use setItem('key', 'value') to save and getItem('key') to retrieve. Everything must be a string!"
              },
              {
                "level": "advanced",
                "title": "JSON Storage",
                "content": "To store objects or arrays, you must use JSON.stringify() before saving and JSON.parse() after retrieving to get your objects back."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='save-in' placeholder='Type something'>\n<button id='save-btn'>Save</button>\n<button id='load-btn'>Load</button>\n<p id='storage-out'></p>",
              "css": "",
              "js": "const btn = document.getElementById('save-btn');\nconst load = document.getElementById('load-btn');\nconst output = document.getElementById('storage-out');\n\nbtn.onclick = () => {\n  const val = document.getElementById('save-in').value;\n  localStorage.setItem('myNote', val);\n  alert('Saved!');\n};\n\nload.onclick = () => {\n  output.innerText = 'Loaded: ' + localStorage.getItem('myNote');\n};"
            },
            "assessment": "Write a script that saves a 'theme' preference (dark/light) to local storage."
          },
          {
            "id": "w2-d5-t7",
            "title": "7. Mini Project – Notes App",
            "visualization": "/js-notes.png",
            "progression": [
              {
                "level": "easy",
                "title": "The App Logic",
                "content": "Create a simple UI with a textarea and a 'Save Note' button. Display the saved notes in a list below."
              },
              {
                "level": "intermediate",
                "title": "Persistent Memory",
                "content": "Every time a note is added, update an array in Local Storage so the user doesn't lose their data on refresh."
              },
              {
                "level": "advanced",
                "title": "CRUD Implementation",
                "content": "Complete the app by adding 'Delete' functionality. Each note should have its own unique ID for targeted removal."
              }
            ],
            "codeTemplate": {
              "html": "<div class='notes-app'>\n  <textarea id='note-text' placeholder='New note...'></textarea>\n  <button id='add-note'>Add Note</button>\n  <div id='notes-list' style='margin-top: 20px;'></div>\n</div>",
              "css": ".note-item { padding: 10px; background: var(--app-card-bg); margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--app-border); display: flex; justify-content: space-between; }",
              "js": "const input = document.getElementById('note-text');\nconst addBtn = document.getElementById('add-note');\nconst list = document.getElementById('notes-list');\n\nlet notes = JSON.parse(localStorage.getItem('notes')) || [];\n\nconst render = () => {\n  list.innerHTML = notes.map((n, i) => `\n    <div class='note-item'>\n      <span>${n}</span>\n      <button onclick='deleteNote(${i})'>X</button>\n    </div>\n  `).join('');\n};\n\nwindow.deleteNote = (i) => {\n  notes.splice(i, 1);\n  localStorage.setItem('notes', JSON.stringify(notes));\n  render();\n};\n\naddBtn.onclick = () => {\n  if (!input.value) return;\n  notes.push(input.value);\n  localStorage.setItem('notes', JSON.stringify(notes));\n  input.value = '';\n  render();\n};\n\nrender();"
            },
            "assessment": "Final Challenge: Add a timestamp to every note saved in the app."
          },
          {
            "id": "w2-d5-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d6",
        "dayTitle": "Day 6: Advanced JS & API Deep Dive",
        "topics": [
          {
            "id": "w2-d6-t1",
            "title": "1. JavaScript Error Handling",
            "visualization": "/js-error-handling.png",
            "progression": [
              {
                "level": "easy",
                "title": "Try / Catch",
                "content": "Errors are inevitable in programming. 'Try/Catch' allows you to attempt an action and gracefully handle any errors that occur without crashing the app."
              },
              {
                "level": "intermediate",
                "title": "Finally & Throw",
                "content": "The 'finally' block runs regardless of whether an error occurred. Use 'throw' to create custom errors when something specific goes wrong."
              },
              {
                "level": "advanced",
                "title": "Error Object Properties",
                "content": "When an error is caught, the error object contains useful properties like 'message' and 'stack', which help you pinpoint exactly where and why it failed."
              }
            ],
            "codeTemplate": {
              "html": "<div id='error-out'></div>",
              "css": ".error-msg { color: #f87171; padding: 10px; background: rgba(248, 113, 113, 0.1); border-radius: 8px; }",
              "js": "const output = document.getElementById('error-out');\n\ntry {\n  const x = 10 / y; // y is not defined\n} catch (err) {\n  output.innerHTML = `<div class='error-msg'>Caught: ${err.message}</div>`;\n} finally {\n  console.log('Cleanup or logging complete.');\n}"
            },
            "assessment": "Write a function that throws an error if a user's input is not a number."
          },
          {
            "id": "w2-d6-t2",
            "title": "2. Debugging Techniques",
            "visualization": "/js-debugging.png",
            "progression": [
              {
                "level": "easy",
                "title": "Console Debugging",
                "content": "Beyond console.log(), you can use console.table() for arrays of objects or console.error() for highlighting issues in the logs."
              },
              {
                "level": "intermediate",
                "title": "The debugger Keyword",
                "content": "Inserting the 'debugger' keyword in your code will automatically pause execution at that line if your browser dev tools are open."
              },
              {
                "level": "advanced",
                "title": "Breakpoints & Watch",
                "content": "Use the Sources tab in DevTools to set breakpoints, inspect variable values at specific moments, and step through code line by line."
              }
            ],
            "codeTemplate": {
              "html": "<button id='debug-btn'>Run Debug Logic</button>",
              "css": "",
              "js": "document.getElementById('debug-btn').onclick = () => {\n  let x = 10;\n  let y = 20;\n  // debugger; // Uncomment to pause in dev tools!\n  let sum = x + y;\n  console.log('Sum calculated:', sum);\n};"
            },
            "assessment": "Describe how to use a 'Watch' expression in the Chrome Debugger."
          },
          {
            "id": "w2-d6-t3",
            "title": "3. Array Advanced Methods",
            "visualization": "/js-array-advanced.png",
            "progression": [
              {
                "level": "easy",
                "title": "Some & Every",
                "content": "some() checks if AT LEAST ONE item matches a condition. every() checks if ALL items match the condition. Both return booleans."
              },
              {
                "level": "intermediate",
                "title": "Find & FindIndex",
                "content": "find() returns the first item that matches a condition. findIndex() returns the position of that item in the array."
              },
              {
                "level": "advanced",
                "title": "The Reduce Power",
                "content": "reduce() is the most powerful array method. It allows you to transform an entire array into a single value (like a sum, or a single object)."
              }
            ],
            "codeTemplate": {
              "html": "<div id='arr-adv-out'></div>",
              "css": "",
              "js": "const scores = [45, 80, 10, 95, 60];\n\nconst anyFail = scores.some(s => s < 20);\nconst total = scores.reduce((acc, s) => acc + s, 0);\n\ndocument.getElementById('arr-adv-out').innerHTML = `\n  Any failures? ${anyFail} <br>\n  Total Score: ${total}\n`;"
            },
            "assessment": "Take an array of objects and use reduce to calculate the total price of all items."
          },
          {
            "id": "w2-d6-t4",
            "title": "4. Object-Oriented JavaScript Basics",
            "visualization": "/js-oop.png",
            "progression": [
              {
                "level": "easy",
                "title": "Classes & Blueprints",
                "content": "A class is a blueprint for creating objects. It defines the structure (properties) and behavior (methods) that all instances will have."
              },
              {
                "level": "intermediate",
                "title": "The Constructor",
                "content": "The constructor() method is a special function that runs automatically when a new object is created from a class."
              },
              {
                "level": "advanced",
                "title": "Instantiation",
                "content": "Use the 'new' keyword to create a specific object instance from a class. Each instance can have its own data but shares the same methods."
              }
            ],
            "codeTemplate": {
              "html": "<div id='oop-out'></div>",
              "css": "",
              "js": "class Hero {\n  constructor(name, power) {\n    this.name = name;\n    this.power = power;\n  }\n  intro() {\n    return `I am ${this.name}, and I can ${this.power}!`;\n  }\n}\n\nconst h1 = new Hero('Flash', 'run fast');\ndocument.getElementById('oop-out').innerText = h1.intro();"
            },
            "assessment": "Create a 'User' class with properties for name and email, and a method that returns a greeting."
          },
          {
            "id": "w2-d6-t5",
            "title": "5. Introduction to APIs",
            "visualization": "/js-api-intro.png",
            "progression": [
              {
                "level": "easy",
                "title": "What is an API?",
                "content": "API stands for Application Programming Interface. It's a way for two software components to talk to each other over the web."
              },
              {
                "level": "intermediate",
                "title": "Request & Response",
                "content": "An API interaction involves a client (your app) sending a Request and a server sending back a Response (usually containing data like JSON)."
              },
              {
                "level": "advanced",
                "title": "REST Architecture",
                "content": "REST is the most common API architectural style. It uses standard HTTP methods (GET, POST, PUT, DELETE) to manage data resources."
              }
            ],
            "codeTemplate": {
              "html": "<h3>API Lifecycle Visualization</h3>\n<div class='api-flow'>Client ↔ Server</div>",
              "css": ".api-flow { padding: 20px; border: 2px solid var(--primary-cyan); border-radius: 12px; text-align: center; }",
              "js": "// Conceptual flow:\n// 1. GET /users (Request)\n// 2. HTTP 200 OK [{...}] (Response)"
            },
            "assessment": "Explain the difference between an API 'Endpoint' and a 'Payload'."
          },
          {
            "id": "w2-d6-t6",
            "title": "6. Fetch API Deep Dive",
            "visualization": "/js-fetch-deep.png",
            "progression": [
              {
                "level": "easy",
                "title": "POST Requests",
                "content": "While GET is for fetching, POST is for sending data to a server (like creating a new user or submitting a form)."
              },
              {
                "level": "intermediate",
                "title": "Handling Headers",
                "content": "Headers provide extra info about the request, such as 'Content-Type: application/json', which tells the server we are sending JSON data."
              },
              {
                "level": "advanced",
                "title": "Processing Responses",
                "content": "Always check response.ok before parsing data. This ensures you handle server errors (like 404 or 500) without breaking your app logic."
              }
            ],
            "codeTemplate": {
              "html": "<button id='post-btn'>Submit Test Data</button>\n<p id='post-res'></p>",
              "css": "",
              "js": "document.getElementById('post-btn').onclick = async () => {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {\n    method: 'POST',\n    body: JSON.stringify({ title: 'Test Post', body: 'JS rules!' }),\n    headers: { 'Content-type': 'application/json' }\n  });\n  const data = await res.json();\n  document.getElementById('post-res').innerText = 'Server ID: ' + data.id;\n};"
            },
            "assessment": "Write a fetch request that sends a DELETE command to an API endpoint."
          },
          {
            "id": "w2-d6-t7",
            "title": "7. Mini Project – User Directory App",
            "visualization": "/js-directory.png",
            "progression": [
              {
                "level": "easy",
                "title": "Fetching the Data",
                "content": "Start by fetching a list of users from a public API (like JSONPlaceholder) and logging them to the console."
              },
              {
                "level": "intermediate",
                "title": "Dynamic Grid",
                "content": "Map through the users and generate a grid of cards, each showing a user's name, email, and company."
              },
              {
                "level": "advanced",
                "title": "Search & Filter",
                "content": "Add a search bar that filters the displayed user cards in real-time as the student types. This combines events, arrays, and DOM skills."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='search' placeholder='Filter by name...'>\n<div id='user-list' class='grid'></div>",
              "css": ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }\n.user-card { padding: 10px; background: var(--app-card-bg); border-radius: 8px; border: 1px solid var(--app-border); }",
              "js": "const list = document.getElementById('user-list');\nconst search = document.getElementById('search');\nlet allUsers = [];\n\nconst render = (users) => {\n  list.innerHTML = users.map(u => `\n    <div class='user-card'>\n      <h4>${u.name}</h4>\n      <p style='font-size: 0.8rem;'>${u.email}</p>\n    </div>\n  `).join('');\n};\n\nfetch('https://jsonplaceholder.typicode.com/users')\n  .then(res => res.json())\n  .then(data => {\n    allUsers = data;\n    render(allUsers);\n  });\n\nsearch.oninput = (e) => {\n  const filtered = allUsers.filter(u => \n    u.name.toLowerCase().includes(e.target.value.toLowerCase())\n  );\n  render(filtered);\n};"
            },
            "assessment": "Final Challenge: Add a button to each card that opens an alert with the user's phone number."
          },
          {
            "id": "w2-d6-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d7",
        "dayTitle": "Day 7: Final Review & Project",
        "topics": [
          {
            "id": "w2-d7-t1",
            "title": "1. JavaScript Revision & Practice",
            "visualization": "/js-revision.png",
            "progression": [
              {
                "level": "easy",
                "title": "Core Logic Review",
                "content": "A quick recap of variables, data types, and operators. These are the building blocks of every JavaScript application."
              },
              {
                "level": "intermediate",
                "title": "Functional & DOM Review",
                "content": "Reviewing how to organize logic into functions and how to use those functions to manipulate the DOM based on user events."
              },
              {
                "level": "advanced",
                "title": "Async & API Review",
                "content": "Final touch-up on Promises, Async/Await, and fetching data. Mastering these allows you to build data-driven, modern web apps."
              }
            ],
            "codeTemplate": {
              "html": "<div id='rev-out'>Ready to review!</div>\n<button id='rev-btn'>Run Comprehensive Check</button>",
              "css": "",
              "js": "const checks = ['Logic', 'Functions', 'DOM', 'Async'];\ndocument.getElementById('rev-btn').onclick = () => {\n  document.getElementById('rev-out').innerText = `Checked: ${checks.join(', ')}`;\n};"
            },
            "assessment": "Write a summary of the most challenging JS concept you learned this week and how you solved it."
          },
          {
            "id": "w2-d7-t2",
            "title": "2. Problem Solving with JavaScript",
            "visualization": "/js-problem-solving.png",
            "progression": [
              {
                "level": "easy",
                "title": "Analyzing the Goal",
                "content": "Before coding, always define the input, the output, and the steps needed to get there. This 'Pseudo-code' phase prevents stuck moments."
              },
              {
                "level": "intermediate",
                "title": "Edge Cases",
                "content": "A good problem solver thinks about what could go wrong. What if the input is null? What if the API is down? Handle these scenarios early."
              },
              {
                "level": "advanced",
                "title": "Refactoring for Performance",
                "content": "Once the code works, look for ways to make it cleaner and faster. Replace messy loops with array methods like .map or .filter where possible."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='pal-in' placeholder='Check palindrome...'>\n<p id='pal-res'></p>",
              "css": "",
              "js": "document.getElementById('pal-in').oninput = (e) => {\n  const str = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const rev = str.split('').reverse().join('');\n  document.getElementById('pal-res').innerText = \n    str && str === rev ? 'It is a palindrome! ✅' : 'Keep typing...';\n};"
            },
            "assessment": "Solve the 'FizzBuzz' problem: Print numbers 1-50, but 'Fizz' for multiples of 3 and 'Buzz' for multiples of 5."
          },
          {
            "id": "w2-d7-t3",
            "title": "3. Building Reusable Logic",
            "visualization": "/js-reusable.png",
            "progression": [
              {
                "level": "easy",
                "title": "DRY Principle",
                "content": "DRY stands for 'Don't Repeat Yourself'. If you see the same code block twice, it should probably be a function."
              },
              {
                "level": "intermediate",
                "title": "Utility Functions",
                "content": "Create a library of small, focused functions (like formatDate, validateEmail) that can be used across different parts of your app."
              },
              {
                "level": "advanced",
                "title": "Generic Components",
                "content": "Write functions that accept configuration objects, allowing them to behave differently in different contexts without changing the core code."
              }
            ],
            "codeTemplate": {
              "html": "<div id='util-out'></div>",
              "css": "",
              "js": "const formatCurrency = (num) => `$${num.toFixed(2)}`;\nconst calculateTax = (price, tax = 0.1) => price * tax;\n\nconst price = 100;\nconst tax = calculateTax(price);\ndocument.getElementById('util-out').innerText = \n  `Price: ${formatCurrency(price)}, Tax: ${formatCurrency(tax)}`;"
            },
            "assessment": "Build a utility function that takes an array and returns only the unique items (no duplicates)."
          },
          {
            "id": "w2-d7-t4",
            "title": "4. Working with Dynamic UI",
            "visualization": "/js-dynamic-ui.png",
            "progression": [
              {
                "level": "easy",
                "title": "State-Driven UI",
                "content": "Think of your UI as a reflection of your data. When the data changes, the UI should update automatically to reflect the new state."
              },
              {
                "level": "intermediate",
                "title": "Conditional Rendering",
                "content": "Show or hide elements based on logic. For example, show a 'Loading...' spinner while fetching and the data once it arrives."
              },
              {
                "level": "advanced",
                "title": "Event Delegation",
                "content": "Instead of adding listeners to every button in a long list, add one listener to the parent. This is much more efficient and handles new items automatically."
              }
            ],
            "codeTemplate": {
              "html": "<div id='ui-state'>Logged Out</div>\n<button id='auth-btn'>Login</button>",
              "css": ".logged-in { color: #4ade80; font-weight: bold; }",
              "js": "let isLoggedIn = false;\nconst btn = document.getElementById('auth-btn');\nconst status = document.getElementById('ui-state');\n\nbtn.onclick = () => {\n  isLoggedIn = !isLoggedIn;\n  status.innerText = isLoggedIn ? 'Welcome back, User!' : 'Logged Out';\n  status.className = isLoggedIn ? 'logged-in' : '';\n  btn.innerText = isLoggedIn ? 'Logout' : 'Login';\n};"
            },
            "assessment": "Create a UI that shows a 'No items found' message only when an array is empty."
          },
          {
            "id": "w2-d7-t5",
            "title": "5. API Integration Workflow",
            "visualization": "/js-api-workflow.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Fetch Phase",
                "content": "The start of the workflow: identifying the endpoint and making the initial network call."
              },
              {
                "level": "intermediate",
                "title": "Data Transformation",
                "content": "Rarely is API data perfect for your UI. This phase involves mapping, filtering, or sorting the raw data before it hits the screen."
              },
              {
                "level": "advanced",
                "title": "Error & Empty States",
                "content": "A professional workflow always handles the 'offline' or 'no results' scenarios, ensuring the user isn't left looking at a blank screen."
              }
            ],
            "codeTemplate": {
              "html": "<button id='load-posts'>Load Posts</button>\n<div id='posts-container'></div>",
              "css": ".post { padding: 10px; border-bottom: 1px solid var(--app-border); }",
              "js": "document.getElementById('load-posts').onclick = async () => {\n  const container = document.getElementById('posts-container');\n  container.innerText = 'Loading...';\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');\n    const posts = await res.json();\n    container.innerHTML = posts.map(p => `<div class='post'><b>${p.title}</b></div>`).join('');\n  } catch (err) {\n    container.innerText = 'Failed to load posts.';\n  }\n};"
            },
            "assessment": "Describe a full API integration workflow from button click to data display."
          },
          {
            "id": "w2-d7-t6",
            "title": "6. Project Structuring Basics",
            "visualization": "/js-structuring.png",
            "progression": [
              {
                "level": "easy",
                "title": "File Organization",
                "content": "Keep your CSS, JS, and Images in separate folders. In JS, separate your UI logic from your data fetching logic."
              },
              {
                "level": "intermediate",
                "title": "Separation of Concerns",
                "content": "Each function or file should do one thing well. A file that fetches users shouldn't also be responsible for styling the cards."
              },
              {
                "level": "advanced",
                "title": "Scalable Architecture",
                "content": "As projects grow, naming conventions and folder hierarchies become critical. Using consistent patterns prevents 'Spaghetti Code'."
              }
            ],
            "codeTemplate": {
              "html": "<h3>Project Structure Preview</h3>\n<pre>/src\n  /api\n  /components\n  /styles\n  index.js</pre>",
              "css": "pre { background: #0f172a; padding: 15px; border-radius: 8px; color: var(--primary-cyan); }",
              "js": "// Keep logic clean and modular!"
            },
            "assessment": "Draw or list a folder structure for a small JS weather application."
          },
          {
            "id": "w2-d7-t7",
            "title": "7. Final Project – Interactive JavaScript Application",
            "visualization": "/js-final-project.png",
            "progression": [
              {
                "level": "easy",
                "title": "Project Goal",
                "content": "Build a 'Movie Search App' that fetches movie data from an API, displays it in a grid, and allows users to 'favorite' movies."
              },
              {
                "level": "intermediate",
                "title": "Core Features",
                "content": "Implement search functionality, dynamic card rendering, and save 'favorites' to Local Storage so they persist."
              },
              {
                "level": "advanced",
                "title": "Polishing & UX",
                "content": "Add a 'loading' state, handle 'no results' found, and ensure the UI is fully responsive and looks professional."
              }
            ],
            "codeTemplate": {
              "html": "<div class='final-app'>\n  <input type='text' id='search' placeholder='Search movies (e.g. Batman)...'>\n  <div id='movie-grid' class='grid'></div>\n</div>",
              "css": ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }\n.movie-card { background: var(--app-card-bg); padding: 10px; border-radius: 12px; border: 1px solid var(--app-border); }",
              "js": "// Final project skeleton\nconst search = document.getElementById('search');\nconst grid = document.getElementById('movie-grid');\n\nsearch.oninput = async (e) => {\n  if (e.target.value.length < 3) return;\n  grid.innerHTML = 'Searching...';\n  // In a real app, you would use a movie API key here!\n  // For this demo, we use placeholder data to simulate the result\n  setTimeout(() => {\n    grid.innerHTML = `\n      <div class='movie-card'>\n        <h4>${e.target.value} Result</h4>\n        <p>Movie information would appear here from the API.</p>\n      </div>\n    `;\n  }, 500);\n};"
            },
            "assessment": "Final Capstone: Submit the link to your completed interactive application."
          },
          {
            "id": "w2-d7-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)"
              ]
            }
          }
        ]
      }
    ]
  }
];
