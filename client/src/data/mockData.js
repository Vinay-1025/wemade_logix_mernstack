import { w1d5Data } from './w1-d5.js';
import { w1d6Data } from './w1-d6.js';
import { w2d1Data } from './w2-d1.js';
import { w2d2Data } from './w2-d2.js';
import { w2d3Data } from './w2-d3.js';
import { w2d4Data } from './w2-d4.js';
import { w2d5Data } from './w2-d5.js';
import { w2d6Data } from './w2-d6.js';
import { w3d1Data } from './w3-d1.js';
import { w3d2Data } from './w3-d2.js';
import { w3d3Data } from './w3-d3.js';
import { w3d4Data } from './w3-d4.js';
import { w3d5Data } from './w3-d5.js';
import { w3d6Data } from './w3-d6.js';
import { w4d1Data } from './w4-d1.js';
import { w4d2Data } from './w4-d2.js';
import { w4d3Data } from './w4-d3.js';
import { w4d4Data } from './w4-d4.js';
import { w4d5Data } from './w4-d5.js';
import { w4d6Data } from './w4-d6.js';
import { w5d1Data } from './w5-d1.js';
import { w5d2Data } from './w5-d2.js';
import { w5d3Data } from './w5-d3.js';
import { w5d4Data } from './w5-d4.js';
import { w5d5Data } from './w5-d5.js';
import { w5d6Data } from './w5-d6.js';
import { w6d1Data } from './w6-d1.js';
import { w6d2Data } from './w6-d2.js';
import { w6d3Data } from './w6-d3.js';
import { w6d4Data } from './w6-d4.js';
import { w6d5Data } from './w6-d5.js';
import { w6d6Data } from './w6-d6.js';
import { w7d1Data } from './w7-d1.js';
import { w7d2Data } from './w7-d2.js';
import { w7d3Data } from './w7-d3.js';
import { w7d4Data } from './w7-d4.js';
import { w7d5Data } from './w7-d5.js';
import { w7d6Data } from './w7-d6.js';

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
                "Student Interactive Lab & Schedules Worksheet (PDF)"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d4",
        "dayTitle": "Day 4: Semantic HTML, Structure & Accessibility",
        "topics": [
          {
            "id": "d4-t1",
            "title": "1. Semantic HTML Layouts",
            "visualization": "/semantic-tags-map.png",
            "customComponent": "SemanticLayoutVisualizer",
            "progression": [
              {
                "level": "easy",
                "title": "Beyond Div Soup",
                "content": "A generic <div> tells the browser nothing about the content. Semantic elements like <header>, <main>, <nav>, and <footer> explain their meaning to both browser agents and screen readers."
              },
              {
                "level": "intermediate",
                "title": "Content Landmarks",
                "content": "Use <article> for self-contained components (like blog entries or widgets), <section> for logical groupings with headings, and <aside> for secondary sidebar callouts."
              },
              {
                "level": "advanced",
                "title": "Text-Level Semantics",
                "content": "Tags like <time>, <figure>, and <figcaption> provide metadata and context descriptors, turning flat text into search-engine readable structured markup."
              }
            ],
            "detailedReference": {
              "summary": "Semantic HTML is the foundation of structural web design. It uses elements that describe their content's purpose to both humans and machines, ensuring browser agents, screen readers, and search engine crawlers can successfully index page structures.",
              "keyConcepts": [
                { "term": "Div Soup Layout", "definition": "The anti-pattern of using generic <div> tags for layout positioning, styling blocks, and structural dividers, stripping all semantic context from the DOM tree." },
                { "term": "Document Landmarks", "definition": "Standardized tags like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> that define logical zones (landmarks) inside a browser's accessibility tree." },
                { "term": "Section vs Article", "definition": "A <section> groups related content under a specific topic header. An <article> contains an independent, self-contained piece of writing or component that can stand alone." }
              ],
              "bestPractices": [
                "Always place page content within a single main landmark <main> representing the unique content of that document.",
                "Never use semantic elements strictly for formatting or default styling changes (e.g. using <aside> just to pull text left or right).",
                "Nest semantic markup hierarchically; do not place <main> inside a <header> or <nav> container."
              ]
            },
            "codeTemplate": {
              "html": "<header>\n  <h1>Tech Blog</h1>\n  <nav>\n    <a href='#'>Home</a> | <a href='#'>Articles</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Semantic HTML Guide</h2>\n    <p>Semantic tags improve accessibility and SEO rankings.</p>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2026 Developer Portal</p>\n</footer>",
              "css": "header { background: #1e293b; padding: 15px; text-align: center; border-radius: 8px; }\nnav { margin-top: 10px; }\nmain { margin: 20px 0; }\narticle { background: #0f172a; border: 1px solid #334155; padding: 20px; border-radius: 8px; }\nfooter { text-align: center; color: #64748b; padding: 10px; }",
              "js": ""
            },
            "assessment": "Verify that your semantic layout wraps the main blog content block in a <main> landmark."
          },
          {
            "id": "d4-t2",
            "title": "2. Web Accessibility & ARIA Basics",
            "visualization": "/web-a11y.png",
            "customComponent": "AccessibilityVisualizer",
            "progression": [
              {
                "level": "easy",
                "title": "Alternate Text Labels",
                "content": "Every content image must have an 'alt' attribute describing its visual contents. Decorative images should use empty alt attributes (alt=\"\") to be ignored by screen readers."
              },
              {
                "level": "intermediate",
                "title": "Semantic Form Controls",
                "content": "Ensure every form <input> has an associated <label> with matching 'for' and 'id' values. This gives screen readers a clear spoken label when the field is selected."
              },
              {
                "level": "advanced",
                "title": "Keyboard Accessibility & ARIA",
                "content": "Use native HTML buttons instead of div click listeners so focus rings and keyboard Space/Enter triggers work automatically. Use aria-labels to provide spoken context."
              }
            ],
            "detailedReference": {
              "summary": "Web Accessibility (a11y) ensures that websites are fully functional and readable for individuals with diverse visual, auditory, motor, or cognitive abilities. Integrating correct HTML tags, label bounds, and ARIA roles is key to building inclusive applications.",
              "keyConcepts": [
                { "term": "Screen Readers", "definition": "Software that reads web layouts aloud based on the browser's accessibility tree, relying heavily on proper DOM tagging." },
                { "term": "Label Input Association", "definition": "Binding form fields to their readable labels using matching for and id tags, which increases input focus targets and announces field names." },
                { "term": "Keyboard Focus Flow", "definition": "The sequential path users traverse using the Tab key. Navigating through forms, links, and buttons requires focus visual indicators (:focus outline styles)." }
              ],
              "bestPractices": [
                "Always declare alt attributes on all <img> tags (use empty alt=\"\" for layout dividers and pure decorative vectors).",
                "Never use <div> or <span> for click actions when a native <button> or <a> link is available.",
                "Ensure focus states have high-contrast visual outlines so keyboard users can track their screen cursor location."
              ]
            },
            "codeTemplate": {
              "html": "<!-- Accessible Form Snippet -->\n<form>\n  <label for='user-name'>Full Name:</label>\n  <input type='text' id='user-name' placeholder='Enter your name' required>\n  \n  <button type='submit' aria-label='Submit registration form'>\n    Register\n  </button>\n</form>",
              "css": "form { background: #1e293b; padding: 20px; border-radius: 12px; display: flex; flex-direction: column; gap: 12px; }\nlabel { font-weight: bold; color: #38bdf8; }\ninput { padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }\nbutton { background: #0ea5e9; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }\nbutton:focus { outline: 2px solid #38bdf8; outline-offset: 2px; }",
              "js": ""
            },
            "assessment": "Build a form containing a labeled input and an accessible button element with an aria-label."
          },
          {
            "id": "d4-t3",
            "title": "3. Document Structure & Headings Outline",
            "visualization": "/headings-hierarchy.png",
            "customComponent": "StructureVisualizer",
            "progression": [
              {
                "level": "easy",
                "title": "The Single H1 Rule",
                "content": "Every web page should have exactly one <h1> element which acts as the main title of the page. Do not use multiple H1s as it confuses site indexing bots."
              },
              {
                "level": "intermediate",
                "title": "Heading Hierarchy Flow",
                "content": "Headings must nest sequentially. An <h2> represents a major subsection of <h1>, and <h3> represents subsections of <h2>. Never jump from H1 directly to H4."
              },
              {
                "level": "advanced",
                "title": "Landmarks & Outlines",
                "content": "Assistive tech tools generate navigation tables from headings. Skipping levels causes broken sections and makes keyboard jumps unreliable."
              }
            ],
            "detailedReference": {
              "summary": "Logical headings structure creates a clean document tree that defines your page outline. This structure enables search engines and screen readers to crawl and navigate sections sequentially.",
              "keyConcepts": [
                { "term": "Sequential Nesting", "definition": "Organizing headings numerically to prevent outline level skipping, keeping section hierarchies intact." },
                { "term": "Single H1 Directive", "definition": "The SEO and layout rule dictating that each unique web resource has a single primary title heading." },
                { "term": "Accessibility Outliner", "definition": "A navigation map built by screen readers that reads page headings aloud, allowing users to jump directly to sections." }
              ],
              "bestPractices": [
                "Do not use heading tags (<h1>-<h6>) strictly to change font size or weights. Use CSS rules instead.",
                "Ensure all primary content sections (e.g. <section>) begin with an appropriate heading tag (<h2>-<h6>) describing the section topic.",
                "Verify that your document outline tree starts with <h1> and moves sequentially down through <h2>, <h3> etc., without skipping ranks."
              ]
            },
            "codeTemplate": {
              "html": "<h1>Developer Resources</h1>\n\n<h2>Frontend Development</h2>\n<h3>HTML Basics</h3>\n<p>Learn core tags.</p>\n\n<h3>CSS Layouts</h3>\n<p>Master Flexbox and Grid.</p>\n\n<h2>Backend Development</h2>\n<h3>NodeJS Core</h3>\n<p>Learn server side logic.</p>",
              "css": "h1 { color: #f43f5e; border-bottom: 2px solid #e11d48; padding-bottom: 10px; }\nh2 { color: #38bdf8; margin-top: 20px; }\nh3 { color: #fbbf24; margin-left: 15px; }\np { margin-left: 15px; color: #94a3b8; }",
              "js": ""
            },
            "assessment": "Structure a document outline where subsections are nested using H2 and H3 tags without skipping levels."
          },
          {
            "id": "d4-t4",
            "title": "4. Assignment Task",
            "progression": [
              {
                "level": "easy",
                "title": "Semantic Landmarks Refactoring",
                "content": "Refactor the outer structure from generic divs into HTML5 semantic containers: <header>, <nav>, <main>, <aside>, and <footer>."
              },
              {
                "level": "intermediate",
                "title": "Logical Headings Hierarchy",
                "content": "Reorganize page headings so they follow a strict hierarchy: exactly one <h1> page title, followed sequentially by <h2> and <h3> tags, correcting skipped levels."
              },
              {
                "level": "advanced",
                "title": "Accessible Form & Media Controls",
                "content": "Add descriptive 'alt' text to all images. Connect the email input field to a proper <label> using matching 'id' and 'for' tags, and add keyboard focus states to button elements."
              }
            ],
            "codeTemplate": {
              "html": "<!-- TASK: Refactor this inaccessible, generic layout into a semantic & accessible portal -->\n<div id=\"app\">\n  <!-- Logo & Navigation Header -->\n  <div class=\"header-bar\">\n    <div class=\"logo-text\">DevBytes Hub</div>\n    <div class=\"links-list\">\n      <a href=\"#articles\">Articles</a>\n      <a href=\"#newsletter\">Subscribe</a>\n    </div>\n  </div>\n\n  <!-- Main Content & Sidebar -->\n  <div class=\"content-layout\">\n    <div class=\"main-feed\">\n      <!-- Heading error: skipped levels (starts directly at h2) -->\n      <h2>Building a Semantic Web Layout</h2>\n      \n      <!-- Accessibility error: missing image description -->\n      <img src=\"https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500\" class=\"post-cover\">\n      \n      <p>Using semantic HTML elements helps search engine crawlers understand content structure and improves accessibility.</p>\n      \n      <h4>Key Landmarks to Remember</h4>\n      <p>Modern layouts use header, nav, main, article, aside, and footer sections.</p>\n    </div>\n\n    <!-- Sidebar containing form -->\n    <div class=\"sidebar-aside\">\n      <h3>Join Our Mailing List</h3>\n      <p>Stay up to date with core frontend tutorials.</p>\n      \n      <div class=\"subscribe-box\">\n        <!-- Accessibility error: input has no label or label association -->\n        <input type=\"email\" placeholder=\"Enter your email address\">\n        <button type=\"button\">Join Newsletter</button>\n      </div>\n    </div>\n  </div>\n\n  <!-- Footer Copyright -->\n  <div class=\"footer-block\">\n    <p>Copyright 2026 DevBytes Hub. All rights reserved.</p>\n  </div>\n</div>",
              "css": "#app { font-family: system-ui, -apple-system, sans-serif; max-width: 850px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px; border: 1px solid #1e293b; }\n.header-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px; }\n.logo-text { font-size: 1.5rem; font-weight: 800; color: #00d1d1; }\n.links-list a { color: #94a3b8; text-decoration: none; margin-left: 16px; font-weight: 600; transition: color 0.2s; }\n.links-list a:hover { color: #00d1d1; }\n.content-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px; }\n@media (max-width: 768px) { .content-layout { grid-template-columns: 1fr; } }\n.main-feed { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; }\n.post-cover { width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin: 12px 0; }\n.sidebar-aside { background: #1a2333; padding: 20px; border-radius: 8px; border: 1px dashed #334155; height: fit-content; }\n.subscribe-box { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }\ninput { padding: 10px 12px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; outline: none; }\ninput:focus { border-color: #00d1d1; }\nbutton { background: #00d1d1; color: #0f172a; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold; transition: opacity 0.2s; }\nbutton:hover { opacity: 0.9; }\n.footer-block { text-align: center; border-top: 1px solid #1e293b; padding-top: 16px; color: #64748b; font-size: 0.85rem; }",
              "js": ""
            },
            "assessment": "Final Checklist:\n1. Convert outer divs into `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` tags.\n2. Fix heading outline: Add a single `<h1>` representing the page title, then use `<h2>` and `<h3>` tags in order (ensure H4 isn't skipped).\n3. Add a descriptive `alt` attribute to the `<img>` tag.\n4. Add a `<label>` element connected to the email `<input>` via matching `id` and `for` attributes. Add an `aria-label` or descriptive accessible text to the `<button>`."
          },
          {
            "id": "w1-d4-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for the Day 4 session on Semantic HTML, Document Structure, and Web Accessibility.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Key visual structures, keyboard accessibility demonstration guidelines, alt text rules, and solutions for the accessible blog challenge.",
              "duration": "15 mins",
              "resources": []
            }
          }
        ]
      },
      w1d5Data,
      w1d6Data
    ]
  },
  {
    "weekId": "w2",
    "weekTitle": "Week 2: Advanced CSS & JavaScript Essentials",
    "days": [
      w2d1Data,
      w2d2Data,
      w2d3Data,
      w2d4Data,
      w2d5Data,
      w2d6Data
    ]
  },
  {
    "weekId": "w3",
    "weekTitle": "Week 3: Advanced JavaScript & React Introduction",
    "days": [
      w3d1Data,
      w3d2Data,
      w3d3Data,
      w3d4Data,
      w3d5Data,
      w3d6Data
    ]
  },
  {
    "weekId": "w4",
    "weekTitle": "Week 4: React Essentials & Routing",
    "days": [
      w4d1Data,
      w4d2Data,
      w4d3Data,
      w4d4Data,
      w4d5Data,
      w4d6Data
    ]
  },
  {
    "weekId": "w5",
    "weekTitle": "Week 5: React Advanced Hooks & MongoDB Foundations",
    "days": [
      w5d1Data,
      w5d2Data,
      w5d3Data,
      w5d4Data,
      w5d5Data,
      w5d6Data
    ]
  },
  {
    "weekId": "w6",
    "weekTitle": "Week 6: Node.js & Express API Development",
    "days": [
      w6d1Data,
      w6d2Data,
      w6d3Data,
      w6d4Data,
      w6d5Data,
      w6d6Data
    ]
  },
  {
    "weekId": "w7",
    "weekTitle": "Week 7: Backend Security, Hashing & Integration",
    "days": [
      w7d1Data,
      w7d2Data,
      w7d3Data,
      w7d4Data,
      w7d5Data,
      w7d6Data
    ]
  },
  {
    "weekId": "w8",
    "weekTitle": "Week 8: Capstone Project & Deployments",
    "days": []
  }
];
