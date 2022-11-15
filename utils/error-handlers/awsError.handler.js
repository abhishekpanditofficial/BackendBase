const AppError = require("../appError");
const httpStatus = require("http-status");

const AwsErrorHandler = (err, next) => {
    let message = "INTERNAL SERVER ERROR";
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    const errorMessages = {
        // Common Errors
        AccessDeniedException: "You do not have sufficient access to perform this action.",
        IncompleteSignature: "The request signature does not conform to AWS standards.",
        InternalFailure: "The request processing has failed because of an unknown error, exception or failure.",
        InvalidAction: "The action or operation requested is invalid. Verify that the action is typed correctly.",
        InvalidClientTokenId: "The X.509 certificate or AWS access key ID provided does not exist in our records.",
        InvalidParameterCombination: "Parameters that must not be used together were used together.",
        InvalidParameterValue: "An invalid or out-of-range value was supplied for the input parameter.",
        InvalidQueryParameter: "The AWS query string is malformed or does not adhere to AWS standards.",
        MalformedQueryString: "The query string contains a syntax error.",
        MissingAction: "The request is missing an action or a required parameter.",
        MissingAuthenticationToken: "The request must contain either a valid (registered) AWS access key ID or X.509 certificate.",
        MissingParameter: "A required parameter for the specified action is not supplied.",
        NotAuthorized: "You do not have permission to perform this action.",
        OptInRequired: "The AWS access key ID needs a subscription for the service.",
        RequestExpired: "The request reached the service more than 15 minutes after the date stamp on the request or more than 15 minutes after the request expiration date (such as for pre-signed URLs), or the date stamp on the request is more than 15 minutes in the future.",
        ServiceUnavailable: "The request has failed due to a temporary failure of the server.",
        ThrottlingException: "The request was denied due to request throttling.",
        ValidationError: "The input fails to satisfy the constraints specified by an AWS service.",
        // WAF Erros
        WAFDuplicateItemException: "Duplicate field value for WAF creation",
        WAFInternalErrorException: "Your request is valid, but AWS WAF couldn’t perform the operation because of a system problem. Retry your request. ",
        WAFInvalidOperationException: "The operation isn't valid.",
        WAFInvalidParameterException: "The operation failed because AWS WAF didn't recognize a parameter in the request. ",
        WAFInvalidResourceException: "AWS WAF couldn’t perform the operation because the resource that you requested isn’t valid. Check the resource, and try again.",
        WAFLimitsExceededException: "AWS WAF couldn’t perform the operation because you exceeded your resource limit. ",
        WAFNonexistentItemException: "AWS WAF couldn’t perform the operation because your resource doesn’t exist.",
        WAFOptimisticLockException: "AWS WAF couldn’t save your changes because you tried to update or delete a resource that has changed since you last retrieved it. Get the resource again, make any changes you need to make to the new copy, and retry your operation. ",
        WAFSubscriptionNotFoundException: "You tried to use a managed rule group that's available by subscription, but you aren't subscribed to it yet. ",
        WAFTagOperationException: "An error occurred during the tagging operation. Retry your request.",
        WAFTagOperationInternalErrorException: "AWS WAF couldn’t perform your tagging operation because of an internal error. Retry your request.",
        WAFUnavailableEntityException: "AWS WAF couldn’t retrieve the resource that you requested. Retry your request.",
        // Cloudfront
        AccessDenied: "Access denied.",
        BatchTooLarge: "Invalidation batch specified is too large.",
        InconsistentQuantities: "The value of Quantity and the size of Items don't match.",
        InvalidArgument: "An argument is invalid.",
        MissingBody: "This operation requires a body. Ensure that the body is present and the Content-Type header is set.",
        NoSuchDistribution: "The specified distribution does not exist.",
        TooManyInvalidationsInProgress: "You have exceeded the maximum number of allowable InProgress invalidation batch requests, or invalidation objects.",
        // ACM Errors
        InvalidArnException: "The requested Amazon Resource Name (ARN) does not refer to an existing resource.",
        InvalidDomainValidationOptionsException: "One or more values in the DomainValidationOption structure is incorrect.",
        InvalidParameterException: "An input parameter was invalid.",
        InvalidTagException: "One or both of the values that make up the key-value pair is not valid. For example, you cannot specify a tag value that begins with aws:.",
        LimitExceededException: "An ACM quota has been exceeded.",
        TagPolicyException: "A specified tag did not comply with an existing tag policy and was rejected.",
        TooManyTagsException: "The request contains too many tags. Try the request again with fewer tags.",
        // Lambda Errors
        InvalidParameterValueException: "One of the parameters in the request is invalid.",
        ResourceNotFoundException: "The resource specified in the request does not exist.",
        ServiceException: "The AWS Lambda service encountered an internal error.",
        TooManyRequestsException: "The request throughput limit was exceeded.",
    };

    message = errorMessages[err.code] || "INTERNAL SERVER ERROR";

    let error = new AppError(statusCode, message, false, err.stack);
    next(error);
};

module.exports = AwsErrorHandler;