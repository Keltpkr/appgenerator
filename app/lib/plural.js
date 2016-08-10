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
    getSingular: function(plural){
        var resp = searchValue(plural);
        if (typeof(resp) == 'undefined'){
            if(plural.substring(plural.length-3,plural.length) =='ies')
                return plural.substring(0,plural.length-3) + 'y';
            if(plural.substring(plural.length-3,plural.length) =='ses')
                return plural.substring(0,plural.length-2);
            if(plural.substring(plural.length-4,plural.length) =='ches')
                return plural.substring(0,plural.length-2);
            if(plural.substring(plural.length-4,plural.length) =='shes')
                return plural.substring(0,plural.length-2);                
            if(plural.substring(plural.length-3,plural.length) =='ves')
                return plural.substring(0,plural.length-3) + 'fe'; 
        } else {
            return resp;
        }
    }
}