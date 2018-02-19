/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 * @description Manager for all routings, simple adding controllers and views
 */

/*jshint esversion: 6 */
/*jshint node: true*/

module.exports = {
    '400': {
        'title': 'Bad Request',
        'text' : 'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).'
    },
    '401': {
        'title': 'Unauthorized (RFC 7235)',
        'text' : 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[34] 401 semantically means "unauthenticated",[35] i.e. the user does not have the necessary credentials. Note: Some sites issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website.'
    },
    '402': {
        'title': 'Payment Required',
        'text' : 'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler[36], but that has not yet happened, and this code is not usually used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.[37] Stripe API uses this code for errors with processing credit cards.'
    },
    '403': {
        'title': 'Forbidden',
        'text' : 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.'
    },
    '404': {
        'title': 'Not Found',
        'text' : 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.'
    },
    '405': {
        'title': 'Method Not Allowed',
        'text' : 'A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.'
    },
    '406': {
        'title': 'Not Acceptable',
        'text' : 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.[39] See Content negotiation.'
    },
    '407': {
        'title': 'Proxy Authentication Required (RFC 7235)',
        'text' : 'The client must first authenticate itself with the proxy.'
    },
    '408': {
        'title': 'Request Timeout',
        'text' : 'The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."[41]'
    },
    '409': {
        'title': 'Conflict',
        'text' : 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.'
    },
    '410': {
        'title': 'Gone',
        'text' : 'Indicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future. Clients such as search engines should remove the resource from their indices.[42] Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.'
    },
    '411' : {
        'title': 'Length Required',
        'text' : 'The request did not specify the length of its content, which is required by the requested resource.'
    },
    '412' : {
        'title': 'Precondition Failed (RFC 7232)',
        'text' : 'The server does not meet one of the preconditions that the requester put on the request.'
    },
    '413' : {
        'title': 'Payload Too Large (RFC 7231)',
        'text' : 'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".'
    },
    '414' : {
        'title': 'URI Too Long (RFC 7231)',
        'text' : 'The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request. Called "Request-URI Too Long" previously.'
    },
    '415' : {
        'title': 'Unsupported Media Type',
        'text' : 'The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.'
    },
    '416' : {
        'title': 'Range Not Satisfiable (RFC 7233)',
        'text' : 'The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.[48] Called "Requested Range Not Satisfiable" previously.[49]'
    },
    '417' : {
        'title': 'Expectation Failed',
        'text' : 'The server cannot meet the requirements of the Expect request-header field.'
    },
    '418' : {
        'title': 'I\'m a teapot (RFC 2324)',
        'text' : 'This code was defined in 1998 as one of the traditional IETF April Fools\' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by teapots requested to brew coffee.[51] This HTTP status is used as an Easter egg in some websites, including Google.com.'
    },
    '421' : {
        'title': 'Misdirected Request (RFC 7540)',
        'text' : 'The request was directed at a server that is not able to produce a response. (for example because of a connection reuse)'
    },
    '422' : {
        'title': 'Unprocessable Entity (WebDAV; RFC 4918)',
        'text' : 'The request was well-formed but was unable to be followed due to semantic errors.'
    },
    '423' : {
        'title': 'Locked (WebDAV; RFC 4918)',
        'text' : 'The resource that is being accessed is locked.'
    },
    '424' : {
        'title': 'Failed Dependency (WebDAV; RFC 4918)',
        'text' : 'The request failed because it depended on another request and that request failed (e.g., a PROPPATCH).'
    },
    '426' : {
        'title': 'Upgrade Required',
        'text' : 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.'
    },
    '428' : {
        'title': 'Precondition Required (RFC 6585)',
        'text' : 'The origin server requires the request to be conditional. Intended to prevent the \'lost update\' problem, where a client GETs a resource\'s state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict."'
    },
    '429' : {
        'title': 'Too Many Requests (RFC 6585)',
        'text' : 'The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.'
    },
    '431' : {
        'title': 'Request Header Fields Too Large (RFC 6585)',
        'text' : 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.'
    },
    '451' : {
        'title': 'Unavailable For Legal Reasons (RFC 7725)',
        'text' : 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451 (see the Acknowledgements in the RFC).'
    },
    '500' : {
        'title': 'Internal Server Error',
        'text' : 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.'
    },
    '501' : {
        'title': 'Not Implemented',
        'text' : 'The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).[62]'
    },
    '502' : {
        'title': 'Bad Gateway',
        'text' : 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
    },
    '503' : {
        'title': 'Service Unavailable',
        'text' : 'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.'
    },
    '504' : {
        'title': 'Gateway Timeout',
        'text' : 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.'
    },
    '505' : {
        'title': 'HTTP Version Not Supported',
        'text' : 'The server does not support the HTTP protocol version used in the request.'
    },
    '506' : {
        'title': 'Variant Also Negotiates (RFC 2295)',
        'text' : 'Transparent content negotiation for the request results in a circular reference.'
    },
    '507' : {
        'title': 'Insufficient Storage (WebDAV; RFC 4918)',
        'text' : 'The server is unable to store the representation needed to complete the request.'
    },
    '508' : {
        'title': 'Loop Detected (WebDAV; RFC 5842)',
        'text' : 'The server detected an infinite loop while processing the request (sent in lieu of 208 Already Reported).'
    },
    '510' : {
        'title': 'Not Extended (RFC 2774)',
        'text' : 'Further extensions to the request are required for the server to fulfil it.'
    },
    '511' : {
        'title': 'Network Authentication Required (RFC 6585)',
        'text' : 'The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).'
    }
};