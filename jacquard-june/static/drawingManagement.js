function clearText() {
    document.getElementById("esCategory").value = '';
    document.getElementById("esIndex").value = '';
    document.getElementById("SearchTag").value = '';
    document.getElementById("ExcludeWords").value = '';
    document.getElementById("KeyWords").value = '';
}


function searchCertainTag() {
    var category = document.getElementById("esCategory").value;
    // var index = document.getElementById("esIndex").value;
    var tag = document.getElementById("SearchTag").value;
    var excludes = document.getElementById("ExcludeWords").value;
    var keys = document.getElementById("KeyWords").value;
    var num = document.getElementById("Nums").value;
    var exactMatchOption = document.getElementById("exactMatch").checked;
    var requestsent = "?category=" + category
    + "&tags=" + tag + "&exclude=" + excludes + "&num=" + num +"&exacted=" + exactMatchOption;

    var tagArray = tag.split(",");
    var scoreOption = document.getElementById("myCheck").checked;

        if (tag.length == 0) {
        alert("please enter some facets");
        return;
    }
    if(requestsent != null) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                data = xhttp.responseText;
                if (data == "Failed") {
                    return;
                }
                else {
                    // handle JSON String
                    var resultStrings = data.split("`");
                    var html = "<table border='1|1'>";
                    html += "<tr>" + "<th>" + ((resultStrings.length - 1).toString()
                        ) + " results are shown below (tagged)" + "</th>" + "<th>" + "untagged" +  "</th>"+ "</tr>";
                    for (var i = 0; i < resultStrings.length; i++) {
                        var tmp = resultStrings[i];
                        for (var j = 0; j < tagArray.length; j++) {


                            var re = new RegExp(tagArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + tagArray[j] + '</span>');

                        }
                        if (!scoreOption) {
                            re = /.*content:/gi;
                            tmp = tmp.replace(re, "");
                        }


                        html += "<tr>";
                        html += "<td>" + tmp + "</td>";

                        tmp = resultStrings[i];
                        if (!scoreOption) {
                            re = /.*content:/gi;
                            tmp = tmp.replace(re, "");
                        }
                        re = /\[[a-z_]*\]/gi;
                        tmp = tmp.replace(re, "");

                        var re = new RegExp(tagArray[j], 'gi');
                        tmp = tmp.replace(re, '<span style="color:darkred;">' + tagArray[j] + '</span>');

                        html += "<td>" + tmp + "</td>";
                        html += "</tr>";
                    }
                    html+="</table>";
                    document.getElementById("displayTable").innerHTML = html;
                }
            }
        };
        xhttp.open("GET", "/searchTag/" + requestsent, true);
        xhttp.send();
    }

}


function searchKeyWords() {
    var category = document.getElementById("esCategory").value;
    // var index = document.getElementById("esIndex").value;
    var tag = document.getElementById("SearchTag").value;
    var excludes = document.getElementById("ExcludeWords").value;
    var keys = document.getElementById("KeyWords").value;
    var num = document.getElementById("Nums").value;
    var exactMatchOption = document.getElementById("exactMatch").checked;
    var requestsent = "?category=" + category + "&keywords=" + keys + "&exclude=" + excludes + "&num=" + num +"&exacted=" + exactMatchOption;
    var keyArray = keys.split(",");
    var scoreOption = document.getElementById("myCheck").checked;
    if (keys.length == 0) {
        alert("please enter some keywords");
        return;
    }

    if(requestsent != null) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                data = xhttp.responseText;
                if (data == "Failed") {
                    return;
                }
                else {
                    // handle JSON String
                    var resultStrings = data.split("`");
                    var html = "<table border='1|1'>";
                    html += "<tr>" + "<th>" + ((resultStrings.length - 1).toString()
                        ) + " results are shown below (tagged)" + "</th>" + "<th>" + "untagged" +  "</th>"+ "</tr>";
                    for (var i = 0; i < resultStrings.length; i++) {
                        var tmp = resultStrings[i];
                        for (var j = 0; j < keyArray.length; j++) {


                            var re = new RegExp(keyArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + keyArray[j] + '</span>');

                        }
                        if (!scoreOption) {
                            re = /.*content:/gi;
                            var mat = tmp.match(re);
                            tmp = tmp.replace(mat, "");
                        }
                        html += "<tr>";
                        html += "<td>" + tmp + "</td>";
                        tmp = resultStrings[i];
                        if (!scoreOption) {
                            re = /.*content:/gi;
                            var mat = tmp.match(re);
                            tmp = tmp.replace(mat, "");
                        }
                        re = /\[[a-z_]*\]/gi;
                        tmp = tmp.replace(re, "");
                        for (var j = 0; j < keyArray.length; j++) {


                            var re = new RegExp(keyArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + keyArray[j] + '</span>');

                        }
                        html += "<td>" + tmp +"</td>";
                        html += "</tr>";

                    }
                    html+="</table>";
                    document.getElementById("displayTable").innerHTML = html;
                }
            }
        };
        xhttp.open("GET", "/searchKeyWord/" + requestsent, true);
        xhttp.send();
    }

}

function searchBoth() {
    var category = document.getElementById("esCategory").value;
    // var index = document.getElementById("esIndex").value;
    var tag = document.getElementById("SearchTag").value;
    var excludes = document.getElementById("ExcludeWords").value;
    var keys = document.getElementById("KeyWords").value;
    var num = document.getElementById("Nums").value;

    var exactMatchOption = document.getElementById("exactMatch").checked;


    var requestsent = "?category=" + category
    + "&keywords=" + keys + "&exclude=" + excludes +"&tag=" + tag + "&num=" + num
    +"&exacted=" + exactMatchOption;
    var keyArray = keys.split(",");
    var tagArray = tag.split(",");
    var scoreOption = document.getElementById("myCheck").checked;

    if (keys.length == 0) {
        alert("please enter some keywords");
        return;
    }

    if(requestsent != null) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                data = xhttp.responseText;
                if (data == "Failed") {
                    return;
                }
                else {
                    // handle JSON String
                    var resultStrings = data.split("`");
                    var html = "<table border='1|1'>";
                    html += "<tr>" + "<th>" + ((resultStrings.length - 1).toString()
                        ) + " results are shown below (tagged)" + "</th>" + "<th>" + "untagged" +  "</th>"+ "</tr>";
                    for (var i = 0; i < resultStrings.length - 1; i++) {
                        var tmp = resultStrings[i];
                        for (var j = 0; j < keyArray.length; j++) {


                                var re = new RegExp(keyArray[j], 'gi');
                                tmp = tmp.replace(re, '<span style="color:darkred;">' + keyArray[j] + '</span>');

                        }

                        for (var j = 0; j < tagArray.length; j++) {


                            var re = new RegExp(tagArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + tagArray[j] + '</span>');

                        }

                        if (!scoreOption) {
                            re = /.*content:/gi;
                            var mat = tmp.match(re);
                            tmp = tmp.replace(mat, "");
                        }

                        html += "<tr>";
                        html += "<td>" + tmp + "</td>";

                        tmp = resultStrings[i];
                        re = /\[[a-z_]*\]/gi;
                        tmp = tmp.replace(re, "");
                        if (!scoreOption) {
                            re = /.*content:/gi;
                            var mat = tmp.match(re);
                            tmp = tmp.replace(mat, "");
                        }
                        for (var j = 0; j < keyArray.length; j++) {


                            var re = new RegExp(keyArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + keyArray[j] + '</span>');

                        }

                        for (var j = 0; j < tagArray.length; j++) {


                            var re = new RegExp(tagArray[j], 'gi');
                            tmp = tmp.replace(re, '<span style="color:darkred;">' + tagArray[j] + '</span>');

                        }


                        html += "<td>" + tmp + "</td>";
                        html += "</tr>";
                    }
                    html+="</table>";
                    document.getElementById("displayTable").innerHTML = html;
                }
            }
        };
        xhttp.open("GET", "/searchBoth/" + requestsent, true);
        xhttp.send();
    }
}


function customizedSearch() {
    var onlyFacetOption = document.getElementById("onlyFacetCheck").checked;
    if (onlyFacetOption) {
        searchCertainTag();
    } else {
        if (!document.getElementById("SearchTag").value.match(/\S/)) {
            searchKeyWords();
        } else {
            searchBoth();
        }
    }
}


