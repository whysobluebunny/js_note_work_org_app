function showUseCaseInfo(useCaseNum, useCaseName)
{
    //console.debug(useCaseNum, useCaseName);
    let useCaseInfoElem = document.getElementById("useCaseInfo");
    let table = document.querySelector("table[data-id='" + useCaseNum + "']");
    if (table)
    {
        useCaseInfoElem.innerHTML = "";
    }
    else
    {
        let scriptC = document.getElementById("c" + useCaseNum);
        //alert("c" + useCaseNum);
        let scriptL = document.getElementById("l" + useCaseNum);
        if (!scriptL) {scriptL = document.getElementsByClassName("l" + useCaseNum)[0];}
        let scriptP = document.getElementById("p" + useCaseNum);
        let tableTemplate = document.getElementById("useCaseInfoTable");
        let htmlTemplate = "";
        if (tableTemplate)
        {
            htmlTemplate = tableTemplate.innerHTML;
        }
        else
        {
            htmlTemplate = "<table border=3 data-id=" + useCaseNum + "><tr><th id=useCaseCaption colspan=3></th></tr><tr><th>Концепция</th><th>Логика</th><th>Физика</th></tr><tr><td id=tdC>&nbsp;</td><td id=tdL>&nbsp;</td><td id=tdP>&nbsp;</td></tr></table>";
        }
        useCaseInfoElem.innerHTML = htmlTemplate;
        let useCaseCaptionElem = document.getElementById("useCaseCaption");
        useCaseCaptionElem.innerHTML = useCaseName;
        let tdC = document.getElementById("tdC");
        let tdL = document.getElementById("tdL");
        let tdP = document.getElementById("tdP");

        if (scriptC)
        {
            tdC.innerHTML = scriptC.outerHTML;
        }
        if (scriptL)
        {
            tdL.innerHTML = scriptL.outerHTML;
        }
        if (scriptP)
        {
            tdP.innerHTML = scriptP.outerHTML;
        }
    }
}