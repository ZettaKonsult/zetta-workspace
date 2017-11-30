package com.zetta.payment.lambda;

import java.io.IOException;
import java.util.Map;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambdaAsync;
import com.amazonaws.services.lambda.AWSLambdaAsyncClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.zetta.payment.util.JSONUtil;

public abstract class LambdaHandler {

    public Map<?, ?> callLambda(String functionName) throws IOException {

        return callLambda(functionName, null);
    }

    public Map<?, ?> callLambda(String functionName, String payload)
            throws IOException {

        AWSLambdaAsync client = AWSLambdaAsyncClientBuilder.standard()
                .withRegion(Regions.EU_CENTRAL_1).build();

        InvokeRequest request = new InvokeRequest();
        request.withFunctionName(functionName).withPayload(payload);

        InvokeResult result = client.invoke(request);

        return JSONUtil.parse(result);
    }
}
