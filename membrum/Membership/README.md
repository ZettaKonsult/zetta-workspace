Parse LADOK files.
Convert data to database entries.
Union assignments.
Preparation for a batch of registrations.

# ladok-parser
Module responsible for parsing LADOK files, as well as assigning unions to people from such files.

## Lambda functions

    assignLadokPeople
    parseUploadedFile

### assignLadokPeople

Fetches the data stored in LadokParseResult (see `serverless.yml` for exact AWS URL), and determines to which union this person belongs. The result is a map `{ssn: union}`.

### parseUploadedFile

Triggered on an upload to the s3-bucket ladok-files, this function parses the file (expecting .csv format), and saves all the people therein in the DynamoDB table `LadokParseResult`.

## Other files

* `unionAssigner.js` 
    Used by `assignLadokPeople`
* `ladokParser.js` 
    Used by `parseUploadedFile`
* `person/ladokPerson.js`
    Data structure for representing a person from a LADOK file.
