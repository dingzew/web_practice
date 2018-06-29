from django.http import HttpResponse
import json
from elasticsearch import Elasticsearch

# some helper list
onlyValue = []
normalDict = dict()
rangeList = []


def searchCertainTag(tag, exclude, category = "jiff-tagged", index = "tagged", exact = "false"):
    es = Elasticsearch(["http://localhost:9200/" +category + "/" + index])
    """Simple Elasticsearch Query"""
    target = ""
    for term in tag:
        target += "["
        target += term
        target += "] "

    exclude_term = ""
    for term in exclude:
        exclude_term += term + " "
    if (exact != "true"):
        query = json.dumps({
            "from": 0, "size" : 1000,
            "query": {
                "bool": {
                  "should": [
                    {
                      "match": {
                        "Sound Bite Text": target
                      }
                    }
                  ],
                  "must_not": [{
                    "match": {
                      "Sound Bite Text": exclude_term
                    }
                  }]
                }
            }

        })
    else:
        query = json.dumps({
            "from": 0, "size": 1000,
            "query": {
                "bool": {
                    "must": [
                        {"match": {"Sound Bite Text": {
                            "query": target,
                            "operator": "and"
                        }}},
                    ],
                    "must_not": [{
                        "match": {"Sound Bite Text": {
                            "query": exclude_term,
                            "operator": "and"
                        }}
                    }]
                }
            },
        })
    return es.search(body=query)


def keyWordsSearchHelper(content = [], exclude = [], category = "jiff-tagged", index = "tagged", exact = "false"):
    es = Elasticsearch(["http://localhost:9200/" + category + "/" + index])
    tmp = ""
    for word in content:
        tmp += word
        tmp += " "

    exclude_term = ""
    for term in exclude:
        exclude_term += term + " "

    if (exact != "true"):
        print("false")
        query = json.dumps({
            "from": 0, "size" : 1000,
            "query": {
                "bool": {
                    "should": [
                        {"match": {'Sound Bite Text': tmp}},
                    ],
                    "must_not": [{
                        "match": {
                            "Sound Bite Text": exclude_term
                        }
                    }]
                }
            },
        })
    else:
        print("true")
        query = json.dumps({
            "from": 0, "size": 1000,
            "query": {
                "bool": {
                    "must": [
                        {"match": {"Sound Bite Text": {
                            "query": tmp,
                            "operator": "and"
                        }}},
                    ],
                    "must_not": [{
                        "match": {"Sound Bite Text": {
                            "query": exclude_term,
                            "operator": "and"
                        }}
                    }]
                }
            },
        })
    return es.search(body=query)


def keywordAndFacetHelper(keyword = [], tag = [],
                          exclude = [], category = "jiff-tagged", index = "tagged", exact = 'false'):
    es = Elasticsearch(["http://localhost:9200/" + category + "/" + index])
    keywords = ""
    for word in keyword:
        keywords += word
        keywords += " "


    tags = ""
    for word in tag:
        tags += word
        tags += " "


    exclude_term = ""
    for term in exclude:
        exclude_term += term + " "

    if (exact != "true"):
        print("false")
        query = json.dumps({
            "from": 0, "size": 1000,
            "query": {
                "bool": {
                    "should": [
                        {"match": {'Sound Bite Text': keywords}}
                    ],
                    "must": [
                        {"match": {'Sound Bite Text': tags}}
                    ],
                    "must_not": [{
                        "match": {
                            "Sound Bite Text": exclude_term
                        }
                    }]
                }
            },
        })
    else:
        print("true")
        query = json.dumps({
            "from": 0, "size": 1000,
            "query": {
                "bool": {
                    "must": [
                        {"match": {"Sound Bite Text": {
                            "query": keywords,
                            "operator": "and"
                        }}},
                        {"match": {"Sound Bite Text": {
                            "query": tags,
                            "operator": "and"
                        }}}
                    ],
                    "must_not": [{
                        "match": {"Sound Bite Text": {
                            "query": exclude_term,
                            "operator": "and"
                        }}
                    }]
                }
            },
        })
    return es.search(body=query)

def searchBoth(request):
    category = request.GET["category"]
    index = request.GET["index"]
    keyword = request.GET["keywords"]
    tags = request.GET["tag"]
    excludes = request.GET["exclude"]
    num = request.GET["num"]
    exact = request.GET["exacted"]
    if (len(num) == 0) :
        num = 100
    else:
        num = int(num)
    tag = tags.split(",")
    exclude = excludes.split(",")
    keyword = keyword.split(",")
    res = keywordAndFacetHelper(keyword, tag, exclude, category, index, exact)
    i = 0
    tmp = ""
    for hit in res['hits']['hits']:
        # print(hit)
        tmp += "score: " + str(hit['_score']) + " content: " + hit['_source']['Sound Bite Text'] + "`"
        i += 1
        if (i >= num): break
    print(len(res['hits']['hits']))
    return HttpResponse(tmp)



def searchTag(request):
    category = request.GET["category"]
    index = request.GET["index"]
    tags = request.GET["tags"]
    excludes = request.GET["exclude"]
    num = request.GET["num"]
    exact = request.GET["exacted"]
    if (len(num) == 0) :
        num = 100
    else:
        num = int(num)
    tag = tags.split(",")
    exclude = excludes.split(",")
    res = searchCertainTag(tag, exclude, category, index, exact)
    i = 0
    tmp = ""
    for hit in res['hits']['hits']:
        # print(hit)
        tmp += "score: " + str(hit['_score']) + " content: " + hit['_source']['Sound Bite Text'] + "`"
        i += 1
        if (i >= num): break
    return HttpResponse(tmp)


def searchKeyword(request):
    category = request.GET["category"]
    index = request.GET["index"]
    keyword = request.GET["keywords"]
    excludes = request.GET["exclude"]
    num = request.GET["num"]
    exact = request.GET["exacted"]
    if (len(num) == 0) :
        num = 100
    else:
        num = int(num)
    keywords = keyword.split(",")
    exclude = excludes.split(",")
    print(keywords)
    print(excludes)
    res = keyWordsSearchHelper(keywords, exclude, category, index, exact)
    i = 0
    tmp = ""
    for hit in res['hits']['hits']:
        # print(hit)
        tmp += "score: " + str(hit['_score']) + " content: " + hit['_source']['Sound Bite Text'] + "`"
        i += 1
        if (i >= num): break
    return HttpResponse(tmp)


def printSearchResult(result):
    i = 0
    for hit in result['hits']['hits']:
        # print(hit)
        print(
            "score: " + str(hit['_score']) + " content: " + hit['_source']['Sound Bite Text'], end=''
        )  # ['_source']['Sound Bite Text']
        i += 1
        if (i > 100): break



if __name__ == "__main__":
    goal = ["pain_points"]
    exclude = ["good"]
    result = searchCertainTag(goal, exclude)
    # result = keyWordsSearch(['frappuccino'])
    printSearchResult(result)



# def DrawingSearch(request):
#     keywords = request.GET["request"]
#     onlyValue = []
#     normalDict = dict()
#     rangeList = []
#     # split by comma
#     keywords = keywords.split(",")
#     for i in range(len(keywords)):
#         if(":" in keywords[i]):
#             keywords[i] = keywords[i].split(":")
#
#     # multiple keywords
#
#     for i in range(len(keywords)):
#         #case 1, only have single value
#         if(len(keywords[i]) != 2):
#             print "the keyword #" + str(i+1) + " only has a value "\
#             + keywords[i]
#             onlyValue.append(keywords[i])
#
#
#
#         #case 2 not range value
#         elif(len(keywords[i]) == 2 and "[" not in keywords[i][1]):
#             print "the keyword #" + str(i+1) + " uses attribute name "\
#             + keywords[i][0] + ", and has a value " + keywords[i][1]
#             normalDict[keywords[i][0]] = keywords[i][1]
#
#
#
#
#         #case 3 range value
#         elif (len(keywords[i]) == 2 and "[" in keywords[i][1]):
#             years = keywords[i][1]
#             years = years.strip("[")
#             years = years.strip("]")
#             years = years.split("-")
#             num1 = years[0]
#             num2 = years[1]
#             print "the keyword #" + str(i + 1) + " uses attribute name "\
#             + keywords[i][0] + ", and has a ranged value with lower boundary "\
#             + num1 + " and upper boundary " + num2
#             # addToRangeList(num1, num2)
#             rangeList.append(int(num1))
#             rangeList.append(int(num2))
#
#         # case 4 Invalid string
#         else:
#             print "Invalid string"
#
#
#     # search end, start filtering
#     result = filterQuery(onlyValue, normalDict, rangeList)
#     return result
#
#
#
#
# # return all the Query Set
# def AllQuerySet():
#     drawings = Drawing.objects.all()
#     return drawings
#
# # return filtered Query Set
# def filterQuery(onlyValue, normalDict, rangeList):
#
#     drawings = Drawing.objects.all()
#     # print drawings
#     # 1. ConstructedYear Query
#     if(len(rangeList) != 0):
#         q = drawings.filter(ConstructedYear__gte=rangeList[0])
#         q = q.filter(ConstructedYear__lte=rangeList[1])
#         # unable to find correct building with given construction year
#         if(len(q) == 0):
#             return HttpResponse("Failed")
#         # 2. have attribute name
#         for key in normalDict:
#             if(key == "DrawingID"):
#                 q = q.filter(DrawingID = normalDict[key])
#             if (key == "BuildingName"):
#                 q = q.filter(BuildingName=normalDict[key])
#             if (key == "Contractor"):
#                 q = q.filter(Contractor=normalDict[key])
#             if (key == "Floor"):
#                 q = q.filter(Floor=normalDict[key])
#             if (key == "Shop"):
#                 q = q.filter(Shop=normalDict[key])
#
#         # 3. handle single value
#         for i in range(len(onlyValue)):
#             q = q.filter(Q(DrawingID=onlyValue[i])|Q(BuildingName=onlyValue[i])|\
#                          Q(Contractor=onlyValue[i])|Q(Floor=onlyValue[i])| \
#                          Q(Shop=onlyValue[i]))
#
#
#     # 1. No ConstructedYear Query
#     else:
#         q = drawings
#         # 2. have attribute name
#         for key in normalDict:
#             if (key == "DrawingID"):
#                 q = q.filter(DrawingID=normalDict[key])
#             if (key == "BuildingName"):
#                 q = q.filter(BuildingName=normalDict[key])
#             if (key == "Contractor"):
#                 q = q.filter(Contractor=normalDict[key])
#             if (key == "Floor"):
#                 q = q.filter(Floor=normalDict[key])
#             if (key == "Shop"):
#                 q = q.filter(Shop=normalDict[key])
#         # 3. handle single value
#         for i in range(len(onlyValue)):
#             q = q.filter(Q(DrawingID=onlyValue[i]) | Q(BuildingName=onlyValue[i]) | \
#                          Q(Contractor=onlyValue[i]) | Q(Floor=onlyValue[i]) | \
#                          Q(Shop=onlyValue[i]))
#
#
#     # print q
#     #end of Query Line, prepare JSON String
#     result = ""
#     for drawing in q:
#         result = result + drawing.DrawingID + ","
#         result = result + drawing.BuildingName + ","
#         result = result + str(drawing.ConstructedYear) + ","
#         result = result + drawing.Contractor + ","
#         result = result + drawing.Floor + ","
#         result = result + drawing.Shop + ";"
#
#     if(len(result) != 0):
#         result = result[:-1]
#
#
#     if(len(result) != 0):
#         return HttpResponse(result)
#     else:
#         return HttpResponse("Failed")
