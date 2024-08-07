const STREET_TYPES = [
  { "name": "ALLEY", "abbreviation": "ALY", "canStart": false },
  { "name": "ANNEX", "abbreviation": "ANX", "canStart": false },
  { "name": "ARCADE", "abbreviation": "ARC", "canStart": false },
  { "name": "AVENUE", "abbreviation": "AVE", "canStart": false },
  { "name": "BAYOU", "abbreviation": "BYU", "canStart": false },
  { "name": "BEACH", "abbreviation": "BCH", "canStart": false },
  { "name": "BEND", "abbreviation": "BND", "canStart": false },
  { "name": "BLUFF", "abbreviation": "BLF", "canStart": false },
  { "name": "BLUFFS", "abbreviation": "BLFS", "canStart": false },
  { "name": "BOTTOM", "abbreviation": "BTM", "canStart": false },
  { "name": "BOULEVARD", "abbreviation": "BLVD", "canStart": false },
  { "name": "BRANCH", "abbreviation": "BR", "canStart": false },
  { "name": "BRIDGE", "abbreviation": "BRG", "canStart": false },
  { "name": "BROOK", "abbreviation": "BRK", "canStart": false },
  { "name": "BROOKS", "abbreviation": "BRKS", "canStart": false },
  { "name": "BURG", "abbreviation": "BG", "canStart": false },
  { "name": "BURGS", "abbreviation": "BGS", "canStart": false },
  { "name": "BYPASS", "abbreviation": "BYP", "canStart": false },
  { "name": "CAMP", "abbreviation": "CP", "canStart": false },
  { "name": "CANYON", "abbreviation": "CYN", "canStart": false },
  { "name": "CAPE", "abbreviation": "CPE", "canStart": false },
  { "name": "CAUSEWAY", "abbreviation": "CSWY", "canStart": false },
  { "name": "CENTER", "abbreviation": "CTR", "canStart": false },
  { "name": "CENTERS", "abbreviation": "CTRS", "canStart": false },
  { "name": "CIRCLE", "abbreviation": "CIR", "canStart": false },
  { "name": "CIRCLES", "abbreviation": "CIRS", "canStart": false },
  { "name": "CLIFF", "abbreviation": "CLF", "canStart": false },
  { "name": "CLIFFS", "abbreviation": "CLFS", "canStart": false },
  { "name": "CLUB", "abbreviation": "CLB", "canStart": false },
  { "name": "COMMON", "abbreviation": "CMN", "canStart": false },
  { "name": "COMMONS", "abbreviation": "CMNS", "canStart": false },
  { "name": "CONCOURSE", "abbreviation": "CONC", "canStart": false },
  { "name": "CORNER", "abbreviation": "COR", "canStart": false },
  { "name": "CORNERS", "abbreviation": "CORS", "canStart": false },
  { "name": "COURSE", "abbreviation": "CRSE", "canStart": false },
  { "name": "COURT", "abbreviation": "CT", "canStart": false },
  { "name": "COURTS", "abbreviation": "CTS", "canStart": false },
  { "name": "COVE", "abbreviation": "CV", "canStart": false },
  { "name": "COVES", "abbreviation": "CVS", "canStart": false },
  { "name": "CREEK", "abbreviation": "CRK", "canStart": false },
  { "name": "CRESCENT", "abbreviation": "CRES", "canStart": false },
  { "name": "CREST", "abbreviation": "CRST", "canStart": false },
  { "name": "CROSSING", "abbreviation": "XING", "canStart": false },
  { "name": "CROSSROAD", "abbreviation": "XRD", "canStart": false },
  { "name": "CROSSROADS", "abbreviation": "XRDS", "canStart": false },
  { "name": "CURVE", "abbreviation": "CURV", "canStart": false },
  { "name": "DALE", "abbreviation": "DL", "canStart": false },
  { "name": "DAM", "abbreviation": "DM", "canStart": false },
  { "name": "DIVIDE", "abbreviation": "DV", "canStart": false },
  { "name": "DRIVE", "abbreviation": "DR", "canStart": false },
  { "name": "DRIVES", "abbreviation": "DRS", "canStart": false },
  { "name": "ESTATE", "abbreviation": "EST", "canStart": false },
  { "name": "ESTATES", "abbreviation": "ESTS", "canStart": false },
  { "name": "EXPRESSWAY", "abbreviation": "EXPY", "canStart": false },
  { "name": "EXTENSION", "abbreviation": "EXT", "canStart": false },
  { "name": "EXTENSIONS", "abbreviation": "EXTS", "canStart": false },
  { "name": "FALL", "abbreviation": "FALL", "canStart": false },
  { "name": "FALLS", "abbreviation": "FL", "canStart": false },
  { "name": "FERRY", "abbreviation": "FRY", "canStart": false },
  { "name": "FIELD", "abbreviation": "FLD", "canStart": false },
  { "name": "FIELDS", "abbreviation": "FLDS", "canStart": false },
  { "name": "FLAT", "abbreviation": "FLT", "canStart": false },
  { "name": "FLATS", "abbreviation": "FLTS", "canStart": false },
  { "name": "FORD", "abbreviation": "FRD", "canStart": false },
  { "name": "FORDS", "abbreviation": "FRDS", "canStart": false },
  { "name": "FOREST", "abbreviation": "FRST", "canStart": false },
  { "name": "FORGE", "abbreviation": "FRG", "canStart": false },
  { "name": "FORGES", "abbreviation": "FRGS", "canStart": false },
  { "name": "FORK", "abbreviation": "FRK", "canStart": false },
  { "name": "FORKS", "abbreviation": "FRKS", "canStart": false },
  { "name": "FORT", "abbreviation": "FT", "canStart": false },
  { "name": "FREEWAY", "abbreviation": "FWY", "canStart": false },
  { "name": "GARDEN", "abbreviation": "GDN", "canStart": false },
  { "name": "GARDENS", "abbreviation": "GDNS", "canStart": false },
  { "name": "GATEWAY", "abbreviation": "GTWY", "canStart": false },
  { "name": "GLEN", "abbreviation": "GLN", "canStart": false },
  { "name": "GLENS", "abbreviation": "GLNS", "canStart": false },
  { "name": "GREEN", "abbreviation": "GRN", "canStart": false },
  { "name": "GREENS", "abbreviation": "GRNS", "canStart": false },
  { "name": "GROVE", "abbreviation": "GRV", "canStart": false },
  { "name": "GROVES", "abbreviation": "GRVS", "canStart": false },
  { "name": "HARBOR", "abbreviation": "HBR", "canStart": false },
  { "name": "HARBORS", "abbreviation": "HBRS", "canStart": false },
  { "name": "HAVEN", "abbreviation": "HVN", "canStart": false },
  { "name": "HEIGHTS", "abbreviation": "HTS", "canStart": false },
  { "name": "HIGHWAY", "abbreviation": "HWY", "canStart": false },
  { "name": "HILL", "abbreviation": "HL", "canStart": false },
  { "name": "HILLS", "abbreviation": "HLS", "canStart": false },
  { "name": "HOLLOW", "abbreviation": "HOLW", "canStart": false },
  { "name": "INLET", "abbreviation": "INLT", "canStart": false },
  { "name": "ISLAND", "abbreviation": "IS", "canStart": false },
  { "name": "ISLANDS", "abbreviation": "ISS", "canStart": false },
  { "name": "ISLE", "abbreviation": "ISLE", "canStart": false },
  { "name": "JUNCTION", "abbreviation": "JCT", "canStart": false },
  { "name": "JUNCTIONS", "abbreviation": "JCTS", "canStart": false },
  { "name": "KEY", "abbreviation": "KY", "canStart": false },
  { "name": "KEYS", "abbreviation": "KYS", "canStart": false },
  { "name": "KNOLL", "abbreviation": "KNL", "canStart": false },
  { "name": "KNOLLS", "abbreviation": "KNLS", "canStart": false },
  { "name": "LAKE", "abbreviation": "LK", "canStart": false },
  { "name": "LAKES", "abbreviation": "LKS", "canStart": false },
  { "name": "LAND", "abbreviation": "LAND", "canStart": false },
  { "name": "LANDING", "abbreviation": "LNDG", "canStart": false },
  { "name": "LANE", "abbreviation": "LN", "canStart": false },
  { "name": "LIGHT", "abbreviation": "LGT", "canStart": false },
  { "name": "LIGHTS", "abbreviation": "LGTS", "canStart": false },
  { "name": "LOAF", "abbreviation": "LF", "canStart": false },
  { "name": "LOCK", "abbreviation": "LCK", "canStart": false },
  { "name": "LOCKS", "abbreviation": "LCKS", "canStart": false },
  { "name": "LODGE", "abbreviation": "LDG", "canStart": false },
  { "name": "LOOP", "abbreviation": "LOOP", "canStart": false },
  { "name": "MALL", "abbreviation": "MALL", "canStart": false },
  { "name": "MANOR", "abbreviation": "MNR", "canStart": false },
  { "name": "MANORS", "abbreviation": "MNRS", "canStart": false },
  { "name": "MEADOW", "abbreviation": "MDW", "canStart": false },
  { "name": "MEADOWS", "abbreviation": "MDWS", "canStart": false },
  { "name": "MEWS", "abbreviation": "MEWS", "canStart": false },
  { "name": "MILL", "abbreviation": "ML", "canStart": false },
  { "name": "MILLS", "abbreviation": "MLS", "canStart": false },
  { "name": "MISSION", "abbreviation": "MSN", "canStart": false },
  { "name": "MOTORWAY", "abbreviation": "MTWY", "canStart": false },
  { "name": "MOUNT", "abbreviation": "MT", "canStart": false },
  { "name": "MOUNTAIN", "abbreviation": "MTN", "canStart": false },
  { "name": "MOUNTAINS", "abbreviation": "MTNS", "canStart": false },
  { "name": "NECK", "abbreviation": "NCK", "canStart": false },
  { "name": "ORCHARD", "abbreviation": "ORCH", "canStart": false },
  { "name": "OVAL", "abbreviation": "OVAL", "canStart": false },
  { "name": "OVERPASS", "abbreviation": "OPAS", "canStart": false },
  { "name": "PARK", "abbreviation": "PARK", "canStart": false },
  { "name": "PARKS", "abbreviation": "PARK", "canStart": false },
  { "name": "PARKWAY", "abbreviation": "PKWY", "canStart": false },
  { "name": "PARKWAYS", "abbreviation": "PKWY", "canStart": false },
  { "name": "PASS", "abbreviation": "PASS", "canStart": false },
  { "name": "PASSAGE", "abbreviation": "PSGE", "canStart": false },
  { "name": "PATH", "abbreviation": "PATH", "canStart": false },
  { "name": "PIKE", "abbreviation": "PIKE", "canStart": false },
  { "name": "PINE", "abbreviation": "PNE", "canStart": false },
  { "name": "PINES", "abbreviation": "PNES", "canStart": false },
  { "name": "PLACE", "abbreviation": "PL", "canStart": false },
  { "name": "PLAIN", "abbreviation": "PLN", "canStart": false },
  { "name": "PLAINS", "abbreviation": "PLNS", "canStart": false },
  { "name": "PLAZA", "abbreviation": "PLZ", "canStart": false },
  { "name": "POINT", "abbreviation": "PT", "canStart": false },
  { "name": "POINTS", "abbreviation": "PTS", "canStart": false },
  { "name": "PORT", "abbreviation": "PRT", "canStart": false },
  { "name": "PORTS", "abbreviation": "PRTS", "canStart": false },
  { "name": "PRAIRIE", "abbreviation": "PR", "canStart": false },
  { "name": "RADIAL", "abbreviation": "RADL", "canStart": false },
  { "name": "RAMP", "abbreviation": "RAMP", "canStart": false },
  { "name": "RANCH", "abbreviation": "RNCH", "canStart": false },
  { "name": "RAPID", "abbreviation": "RPD", "canStart": false },
  { "name": "RAPIDS", "abbreviation": "RPDS", "canStart": false },
  { "name": "REST", "abbreviation": "RST", "canStart": false },
  { "name": "RIDGE", "abbreviation": "RDG", "canStart": false },
  { "name": "RIDGES", "abbreviation": "RDGS", "canStart": false },
  { "name": "RIVER", "abbreviation": "RIV", "canStart": false },
  { "name": "ROAD", "abbreviation": "RD", "canStart": false },
  { "name": "ROADS", "abbreviation": "RDS", "canStart": false },
  { "name": "ROUTE", "abbreviation": "RTE", "canStart": false },
  { "name": "ROW", "abbreviation": "ROW", "canStart": false },
  { "name": "RUE", "abbreviation": "RUE", "canStart": false },
  { "name": "RUN", "abbreviation": "RUN", "canStart": false },
  { "name": "SHOAL", "abbreviation": "SHL", "canStart": false },
  { "name": "SHOALS", "abbreviation": "SHLS", "canStart": false },
  { "name": "SHORE", "abbreviation": "SHR", "canStart": false },
  { "name": "SHORES", "abbreviation": "SHRS", "canStart": false },
  { "name": "SKYWAY", "abbreviation": "SKWY", "canStart": false },
  { "name": "SPRING", "abbreviation": "SPG", "canStart": false },
  { "name": "SPRINGS", "abbreviation": "SPGS", "canStart": false },
  { "name": "SPUR", "abbreviation": "SPUR", "canStart": false },
  { "name": "SPURS", "abbreviation": "SPUR", "canStart": false },
  { "name": "SQUARE", "abbreviation": "SQ", "canStart": false },
  { "name": "SQUARES", "abbreviation": "SQS", "canStart": false },
  { "name": "STATION", "abbreviation": "STA", "canStart": false },
  { "name": "STRAVENUE", "abbreviation": "STRA", "canStart": false },
  { "name": "STREAM", "abbreviation": "STRM", "canStart": false },
  { "name": "STREET", "abbreviation": "ST", "canStart": false },
  { "name": "STREETS", "abbreviation": "STS", "canStart": false },
  { "name": "SUMMIT", "abbreviation": "SMT", "canStart": false },
  { "name": "TERRACE", "abbreviation": "TER", "canStart": false },
  { "name": "THROUGHWAY", "abbreviation": "TRWY", "canStart": false },
  { "name": "TRACE", "abbreviation": "TRCE", "canStart": false },
  { "name": "TRACK", "abbreviation": "TRAK", "canStart": false },
  { "name": "TRAFFICWAY", "abbreviation": "TRFY", "canStart": false },
  { "name": "TRAIL", "abbreviation": "TRL", "canStart": false },
  { "name": "TRAILER", "abbreviation": "TRLR", "canStart": false },
  { "name": "TUNNEL", "abbreviation": "TUNL", "canStart": false },
  { "name": "TURNPIKE", "abbreviation": "TPKE", "canStart": false },
  { "name": "UNDERPASS", "abbreviation": "UPAS", "canStart": false },
  { "name": "UNION", "abbreviation": "UN", "canStart": false },
  { "name": "UNIONS", "abbreviation": "UNS", "canStart": false },
  { "name": "VALLEY", "abbreviation": "VLY", "canStart": false },
  { "name": "VALLEYS", "abbreviation": "VLYS", "canStart": false },
  { "name": "VIADUCT", "abbreviation": "VIA", "canStart": false },
  { "name": "VIEW", "abbreviation": "VW", "canStart": false },
  { "name": "VIEWS", "abbreviation": "VWS", "canStart": false },
  { "name": "VILLAGE", "abbreviation": ["VILL", "VLG"] },
  { "name": "VILLAGES", "abbreviation": "VLGS", "canStart": false },
  { "name": "VILLE", "abbreviation": "VL", "canStart": false },
  { "name": "VISTA", "abbreviation": "VIS", "canStart": false },
  { "name": "WALK", "abbreviation": "WALK", "canStart": false },
  { "name": "WALKS", "abbreviation": "WALK", "canStart": false },
  { "name": "WALL", "abbreviation": "WALL", "canStart": false },
  { "name": "WAY", "abbreviation": "WAY", "canStart": false },
  { "name": "WAYS", "abbreviation": "WAYS", "canStart": false },
  { "name": "WELL", "abbreviation": "WL", "canStart": false },
  { "name": "WELLS", "abbreviation": "WLS", "canStart": false }
] as const;

type StreetName = typeof STREET_TYPES[number]["name"];
type StreetAbbreviation = typeof STREET_TYPES[number]["abbreviation"];

export default STREET_TYPES;
