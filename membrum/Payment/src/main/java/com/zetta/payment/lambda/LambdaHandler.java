package com.zetta.payment.lambda;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambdaAsync;
import com.amazonaws.services.lambda.AWSLambdaAsyncClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.zetta.payment.util.JSON;

/**
 * @date 2017-11-14
 */
public abstract class LambdaHandler {

    public final JSON callLambda(String functionName) {

        return callLambda(functionName, null);
    }

    public final JSON callLambda(String functionName, String payload) {

        AWSLambdaAsync client = AWSLambdaAsyncClientBuilder.standard()
                .withRegion(Regions.EU_CENTRAL_1).build();

        InvokeRequest request = new InvokeRequest();
        request.withFunctionName(functionName).withPayload(payload);

        InvokeResult result = client.invoke(request);

        return new JSON(result);
    }
}
