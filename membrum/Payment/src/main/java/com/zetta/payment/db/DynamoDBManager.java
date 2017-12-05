/*
 * Copyright 2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 * 
 * http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
package com.zetta.payment.db;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class DynamoDBManager {

    private static volatile DynamoDBManager instance;

    private static DynamoDBMapper mapper;

    private DynamoDBManager() {

        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
                .withRegion(Regions.EU_CENTRAL_1).build();
        mapper = new DynamoDBMapper(client);
    }

    public static DynamoDBManager instance() {

        if (instance == null) {
            synchronized (DynamoDBManager.class) {
                if (instance == null)
                    instance = new DynamoDBManager();
            }
        }

        return instance;
    }

    public static DynamoDBMapper mapper() {

        DynamoDBManager.instance();
        return DynamoDBManager.mapper;
    }
}
