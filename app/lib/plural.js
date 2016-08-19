var list = {
    'aircraft':'aircraft',
    'alumnus':'alumni',
    'cactus':'cacti',
    'focus':'foci',
    'focus':'focuses',        
    'fungus':'fungi',
    'fungus':'funguses',
    'nucleus':'nuclei',
    'radius':'radii',
    'stimulus':'stimuli',
    'axis':'axes',
    'analysis':'analyses',
    'basis':'bases',
    'crisis':'crises',
    'diagnosis':'diagnoses',
    'ellipsis':'ellipses',
    'hypothesis':'hypotheses',
    'oasis':'oases',
    'paralysis':'paralyses',
    'parenthesis':'parentheses',
    'synthesis':'syntheses',
    'synopsis':'synopses',
    'thesis':'theses',     
    'appendix':'appendices',
    'index':'indeces',
    'index':'indexes',
    'matrix':'matrices',
    'matrix':'matrixes',
    'beau':'beaux',
    'bureau':'bureaus',
    'bureau':'bureaux',
    'tablea':'tableaux',
    'tablea':'tableaus',
    'child':'children',
    'man':'men',
    'ox':'oxen',
    'woman':'women',
    'bacterium':'bacteria',
    'corpus':'corpora',
    'criterion':'criteria',
    'curriculum':'curricula',
    'datum':'data',
    'genus':'genera',
    'medium':'media',
    'memorandum':'memoranda',
    'phenomenon':'phenomena',
    'stratum':'strata',       
    'deer':'deer',
    'fish':'fish',
    'means':'means',
    'offspring':'offspring',
    'series':'series',
    'sheep':'sheep',
    'species':'species',      
    'foot':'feet',
    'goose':'geese',
    'tooth':'teeth',
    'antenna':'antennae',
    'antenna':'antennas',
    'formula':'formulae',
    'formula':'formulas',
    'nebula':'nebulae',
    'vertebra':'vertebrae',
    'vita':'vitae', 
    'louse':'lice',
    'mouse':'mice'         
}
function searchValue(item) {
    for(var key in list){
        if (list[key] == item)
        return key;
    }
    return undefined;
}
module.exports = {
    getSingular: function(string_item){
        var resp = searchValue(string_item);
        var regex = ".[0-9]$";
        if (typeof(resp) == 'undefined'){
            if(string_item.substring(string_item.length-3,string_item.length) =='ies')
                return string_item.substring(0,string_item.length-3) + 'y';
            if(string_item.substring(string_item.length-3,string_item.length) =='ses')
                return string_item.substring(0,string_item.length-2);
            if(string_item.substring(string_item.length-4,string_item.length) =='ches')
                return string_item.substring(0,string_item.length-2);
            if(string_item.substring(string_item.length-4,string_item.length) =='shes')
                return string_item.substring(0,string_item.length-2);                
            if(string_item.substring(string_item.length-3,string_item.length) =='ves')
                return string_item.substring(0,string_item.length-3) + 'fe'; 
            if(string_item.charAt(string_item.length-1) =='s')
                return string_item.substring(0,string_item.length-1)
            if(string_item.match(regex))
                return string_item + '_s';
        } else {
            return resp;
        }
    }
}