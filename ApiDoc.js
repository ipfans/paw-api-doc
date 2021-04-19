//
//	Extract and format the API in a way that is well organized
//
let ExportApiToMarkdown = function () {
    this.generate = function (context, requests, options) {
        //
        //	1.	Create an empty string that which will hold the formated TXT
        //		file
        //

        let md_file = "";

        //
        //	2.	Loop over each endpoint and extract, and format the data
        //		the way we like it.
        //
        for (let key in requests) {
            //
            //	1.	Create a clear readable that holds the endpoint
            //
            let endpoint = requests[key];

            //
            //	2.	Create a empty array that will hold the data for
            //		one section endpoint
            //
            let section = [];

            //
            //	3.	Get the name of the endpoint
            //
            section.push('### ' + endpoint.name);

            section.push('\n\n');

            let description = endpoint.description || "No description.";

            section.push(description);

            section.push('\n\n');

            //
            //	4.	Get the endpoint path of the endpoint with the method
            //
            section.push('#### Endpoint');

            section.push('\n\n');

            section.push('**' + endpoint.method + '** `' + endpoint.url + '`');

            section.push('\n\n');

            var contentType = 'text/plain; charset=UTF-8'

            section.push('#### Request Type');

            section.push('\n\n');

            if (endpoint.getHeadersNames().includes('Content-Type')) {
                contentType = endpoint.getHeaders()['Content-Type'];

                section.push('`' + contentType + '`');

                section.push('\n\n');
            }

            section.push('#### Query Parameters');

            section.push('\n\n');

            if (endpoint.urlQuery) {
                section.push('| Name | Type | Example | Description |\n');

                section.push('|:------:|:------:|:-----|:-----|\n');

                let kv = endpoint.getUrlParameters(true);

                for (let k in kv) {
                    section.push('|' + k + '|' + typeof kv[k] + '|' + kv[k] + '| - |\n');
                }

                section.push('\n\n');
            } else {
                section.push('None.');

                section.push('\n\n');
            }

            section.push('#### Request Body Parameters');

            section.push('\n\n');

            section.push('| Name | Type | Example | Description |\n');

            section.push('|:------:|:------:|:-----|:-----|\n');

            if (endpoint.getUrlEncodedBody(false)) {
                let arr = endpoint.getUrlEncodedBodyKeys();
                for (let k in arr) {
                    section.push('|' + arr[k] + '| string |' + endpoint.getUrlEncodedBodyKey([arr[k]]) + '| - |\n');
                }
            }

            if (endpoint.getMultipartBody(false)) {
                let kv = endpoint.getMultipartBody(false);
                for (let k in kv) {
                    section.push('|' + k + '|' + typeof kv[k] + '|' + kv[k] + '| - |\n');
                }
            }

            if (endpoint.jsonBody) {
                for (let k in endpoint.jsonBody) {
                    section.push('|' + k + '|' + typeof endpoint.jsonBody[k] + '|' + endpoint.jsonBody[k] + '| - |\n');
                }
            }

            section.push('\n\n');

            section.push('#### Request Body Example');

            section.push('\n\n');

            section.push('```');

            if (endpoint.getUrlEncodedBody(false)) {
                section.push('json\n');
                var formBody = [];
                let arr = endpoint.getUrlEncodedBodyKeys();
                for (let k in arr) {
                    var encodedKey = encodeURIComponent(arr[k]);
                    var encodedValue = encodeURIComponent(endpoint.getUrlEncodedBodyKey([arr[k]]));
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                section.push(formBody.join("&"));
            }

            if (endpoint.jsonBody) {
                section.push('json\n');
                section.push(JSON.stringify(endpoint.jsonBody, null, 2));
            }

            section.push('\n');

            section.push('```');

            section.push('\n\n');

            section.push('#### Response Body Parameters');

            section.push('\n\n');

            section.push('| Name | Type | Example | Description |\n');

            section.push('|:------:|:------:|:-----|:-----|\n');
            section.push('| - | - | - | - |\n');

            section.push('\n\n');

            section.push('#### Response Body Example');

            section.push('\n\n');

            section.push('```json');

            section.push('\n');

            section.push(endpoint.getLastExchange().responseBody);

            section.push('\n');

            section.push('```');

            section.push('\n\n');

            //
            //	Convert the array with all the data in to a single string
            //	which will become out .md file.
            //
            md_file += section.join("");
        }

        //
        //	->	Return the .md file to Paw
        //
        return md_file;
    }
}

//
//	Set some mandatory basic information about the extension
//
ExportApiToMarkdown.identifier = "com.4async.apidoc";
ExportApiToMarkdown.title = "Export API to Humanable Markdown";
ExportApiToMarkdown.fileExtension = "md";
ExportApiToMarkdown.languageHighlighter = "markdown";

//
//	Expose the function to Paw
//
registerCodeGenerator(ExportApiToMarkdown);
