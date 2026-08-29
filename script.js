/**
 * BoilerCorrIndia — Industrial Boiler Corrosion Predictive Engine & State-Wise Mitigation Suite
 * Computational Models: Verhoff-Banchero Acid Dew Point, Pourbaix Fe-H2O pH Stability,
 * Dissolved Oxygen Pitting Kinetics, and State-Wise Exposure Classifications.
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. MASTER ALL-INDIA STATE BOILER CORROSION DATABASE (28 States & UTs)
  // =========================================================================
  const STATE_DATABASE = {
    gujarat: {
      name: "Gujarat",
      zone: "Coastal Saline & Petrochemical Belt",
      category: "coastal",
      csi: 0.82,
      clusters: ["Jamnagar (Refineries)", "Dahej (Petrochemicals/PCPIR)", "Ankleshwar (Chemicals)", "Hazira (Steel/LNG)", "Surat (Textiles/Dyeing)", "Mundra (Thermal Power)"],
      fuels: ["Imported Coal (0.8% S)", "Petcoke (3.5% S)", "Natural Gas", "Lignite (Kutch)"],
      waterSource: "Gulf of Khambhat Marine / Brackish Narmada Estuary / Saline Borewells",
      waterHardness: "High Hardness (380-650 ppm CaCO₃), High Cl⁻ (450-1200 ppm)",
      exposureType: "marine",
      baseline: { ph: 8.8, do: 25, tds: 850, pressure: 110, sulfur: 2.2, flueTemp: 125 },
      vulnerabilities: [
        "Chloride Stress Corrosion Cracking (SCC) in austenitic superheater tubes due to marine aerosol ingress.",
        "Severe Low-Temperature Sulfuric Acid Dew Point corrosion in APH due to high-sulfur petcoke blending.",
        "Under-Deposit Caustic Gouging in waterwalls fed by high-TDS brackish groundwater."
      ],
      controlPlan: [
        {
          title: "Tier 1: Feedwater Demineralization & Chemical Treatment",
          desc: "Implement Dual-Pass Reverse Osmosis followed by Electro-Deionization (EDI) to depress raw chlorides below 0.05 ppm. Transition to All-Volatile Treatment (AVT-O) with Ammonia/Morpholine and eliminate sodium-based caustic additives.",
          params: ["Target Feedwater pH: 9.2 - 9.6", "Chloride in Boiler Drum: < 1.0 ppm", "Dissolved Oxygen: < 5 ppb (at Economizer Inlet)"]
        },
        {
          title: "Tier 2: Mechanical Deaeration & Cold-End Thermal Trimming",
          desc: "Maintain pressurized spray-cum-tray deaerator pegging at 1.4 bar (110°C). Install Steam Coil Air Preheater (SCAPH) before the tubular APH to keep cold-end metal temperature strictly > 138°C (above sulfuric acid dew point).",
          params: ["Deaerator Pegging: 1.2 - 1.5 bar", "Min Metal Temp APH: > 138 °C", "SCAPH Steam Trim: 3.5 bar sat. steam"]
        },
        {
          title: "Tier 3: Metallurgical & Cladding Upgrades",
          desc: "Upgrade superheater pendant loops from SA213-T22 to ASME SA213-TP347H with 50-micron Inconel 625 (NiCrMo-3) automated weld overlay in the sootblower impingement zone. Replace mild steel APH tubes with Corten-A / enamel-coated elements.",
          params: ["Superheater Alloy: SA213-TP347H", "Overlay: Inconel 625 Clad", "APH Element: Corten-A / Vitreous Enamel"]
        },
        {
          title: "Tier 4: Flue Gas & Sootblowing Optimization",
          desc: "Enforce daily sonic sootblowing over conventional high-moisture steam sootblowing to prevent localized acid condensation in petcoke flue gas passages. Maintain excess air ratio at 1.15 to limit SO₃ conversion.",
          params: ["Sootblower Medium: Dry Sonic / High-Superheat Steam", "O₂ in Flue Gas: 3.0 - 3.5%", "SO₃ Inhibition: Magnesium Oxide Injection"]
        },
        {
          title: "Tier 5: Real-Time NDT & Corrosion Monitoring",
          desc: "Install Online Cation Conductivity and Sodium Analyzers on saturated steam lines (IS 10392 compliance). Perform annual Phased Array Ultrasonic Testing (PAUT) and Electromagnetic Acoustic Transducer (EMAT) scans on waterwalls.",
          params: ["Cation Cond.: < 0.15 µS/cm", "Inspection: EMAT & PAUT Grid (100mm)", "Monitoring: High-Temp Hydrogen Flux Probes"]
        }
      ]
    },

    maharashtra: {
      name: "Maharashtra",
      zone: "Coastal Industrial & Agro-Sugar Belt",
      category: "sugar",
      csi: 0.74,
      clusters: ["Mumbai-Thane (Chem/Refinery)", "Pune-Pimpri (Auto/Engg)", "Kolhapur-Sangli (Sugar/Co-gen)", "Nagpur-Chandrapur (Thermal Power)", "Tarapur (Chemical MIDC)"],
      fuels: ["Bagasse (Co-gen)", "Domestic Coal (0.5% S, 42% Ash)", "Fuel Oil (HFO)", "Natural Gas"],
      waterSource: "Krishna/Godavari River Basins / Coastal Arabian Sea / MIDC Pipelined Water",
      waterHardness: "Moderate to High (220-450 ppm CaCO₃), High Organic Load in Sugar Belt",
      exposureType: "industrial",
      baseline: { ph: 8.9, do: 30, tds: 620, pressure: 65, sulfur: 0.8, flueTemp: 138 },
      vulnerabilities: [
        "Organic acid breakdown & carbonic acid attack in condensate returns of sugar mill bagasse boilers.",
        "Severe fly-ash erosion and high-temperature alkali slagging on superheater coils in Chandrapur coal boilers.",
        "Oxygen pitting in seasonal co-gen boilers during off-season preservation periods."
      ],
      controlPlan: [
        {
          title: "Tier 1: Condensate Neutralization & Phosphate Program",
          desc: "Dose neutralizing filming polyamines (DEAE / Cyclohexylamine) in condensate lines to counteract volatile sugar juice carryover and organic acid formation. Maintain Congruent Phosphate Treatment (CPT) with Na:PO₄ molar ratio of 2.3–2.6 in the drum.",
          params: ["Target Condensate pH: 8.8 - 9.2", "Drum PO₄: 3 - 8 ppm", "Condensate Sugar Alert: < 2 ppm (Automatic Dump)"]
        },
        {
          title: "Tier 2: Off-Season Wet/Dry Preservation Protocol",
          desc: "During non-crushing season (6 months shutdown), enforce Nitrogen Blanket (0.35 bar dry N₂) or complete wet preservation with demineralized water dosed with 200 ppm Hydrazine and 10 ppm Ammonia (pH > 10.0).",
          params: ["N₂ Blanket Purity: > 99.6%", "Wet Layup Hydrazine: 150 - 200 ppm", "Layup pH: 10.2 - 10.5"]
        },
        {
          title: "Tier 3: Erosion-Resistant Thermal Spray Cladding",
          desc: "Apply High-Velocity Oxy-Fuel (HVOF) Cr₃C₂-NiCr (80/20) ceramic-metallic coating (300 µm) on first two rows of boiler bank and economizer coils subjected to abrasive 40% ash coal and bagasse sand scour.",
          params: ["Coating: HVOF Cr₃C₂-NiCr", "Thickness: 250 - 350 µm", "Hardness: > 850 HV"]
        },
        {
          title: "Tier 4: Flue Gas Temperature & Air Heater Management",
          desc: "Maintain flue gas exit temperature at 145°C during bagasse firing with >45% fuel moisture. Implement automated sootblower cycling to prevent sticky alkali silicate deposits on superheaters.",
          params: ["Bagasse Moisture Limit: < 50%", "APH Cold End Temp: > 130 °C", "Combustion Air Temp: 180 - 210 °C"]
        },
        {
          title: "Tier 5: Non-Destructive Testing & Tube Thickness Audit",
          desc: "Conduct annual ultrasonic thickness gauging (UTG) along high-heat flux waterwall zones and economizer return bends in compliance with Indian Boiler Regulations (IBR Form XVI).",
          params: ["UTG Grid: 50mm x 50mm", "Retire Thickness: t_min per IBR Sec 338", "Hydrostatic Test: 1.5x Design Pressure"]
        }
      ]
    },

    chhattisgarh: {
      name: "Chhattisgarh",
      zone: "Central High-Ash Coal & Metal Belt",
      category: "coal",
      csi: 0.88,
      clusters: ["Korba (NTPC/CSEB Mega Power)", "Bhilai (Steel Authority of India)", "Raigarh (Jindal Steel & Power)", "Raipur (Sponge Iron/Rolling Mills)", "Bilaspur (Power Grid)"],
      fuels: ["Indian G-11 to G-13 Coal (Ash 42-48%, S 0.45%)", "Blast Furnace (BF) Gas", "Coke Oven Gas", "Coal Washery Rejects"],
      waterSource: "Hasdeo & Mahanadi River Basins / Deep Mine Water Aquifers",
      waterHardness: "Moderate Hardness (180-320 ppm CaCO₃), High Colloidal Silica (25-45 ppm SiO₂)",
      exposureType: "industrial",
      baseline: { ph: 9.0, do: 18, tds: 420, pressure: 170, sulfur: 0.5, flueTemp: 140 },
      vulnerabilities: [
        "High-temperature coal ash fireside corrosion & alkali-iron trisulfate attack in superheater loops.",
        "Silica carryover and deposition on steam turbine blading due to high silica raw river water.",
        "Under-deposit hydrogen damage and window embrittlement under porous magnetite deposits in waterwalls."
      ],
      controlPlan: [
        {
          title: "Tier 1: High-Purity Demineralization & AVT(O) Chemistry",
          desc: "Operate dual-stage reverse osmosis + mixed bed polisher with strong base anion resins for colloidal silica removal. Maintain Oxygenated Treatment (OT) / All-Volatile Oxidizing regime with 50–150 ppb high-purity O₂ injection.",
          params: ["Feedwater Silica: < 0.01 ppm", "Drum Silica: < 0.20 ppm at 170 bar", "Cation Conductivity: < 0.10 µS/cm"]
        },
        {
          title: "Tier 2: Mechanical Deaeration & Sootblowing Steam Superheat",
          desc: "Ensure deaerator effluent DO is < 2 ppb in AVT(R) mode or controlled in OT mode. Supply high-superheat steam (>300°C) to wall blowers and long retractable sootblowers (LRSB) to avoid moisture erosion.",
          params: ["LRSB Steam Pressure: 18 - 24 bar", "LRSB Steam Superheat: > 60 °C", "Blower Travel Speed: 2.5 m/min"]
        },
        {
          title: "Tier 3: Advanced Creep & Oxidation Resistant Alloys",
          desc: "Install ASME SA213-T91 (9Cr-1Mo-V) and T92 in platen and final superheaters. Apply diffusion chromizing or high-velocity arc spray (Ni-50Cr) to shield waterwall tubes from reducing sulfidation atmospheres.",
          params: ["Superheater Alloy: SA213-T91/T92", "Waterwall Shielding: Arc Spray Ni-50Cr", "Thickness Allowance: +1.5mm Corrosion Margin"]
        },
        {
          title: "Tier 4: Chemical Cleaning & Sludge Flushes",
          desc: "Schedule EDTA (Inhibited Ethylenediaminetetraacetic Acid) or Citrosolv chemical clean every 4-5 years when waterwall internal deposit weight density exceeds 25 mg/cm².",
          params: ["Chemical Clean Trigger: > 25 mg/cm²", "Cleaning Agent: 6% EDTA / 0.5% Citric", "Post-Clean Passivation: Sodium Nitrite + NH₃"]
        },
        {
          title: "Tier 5: Real-Time Boiler Tube Leak Detection",
          desc: "Deploy acoustic emission leak detection sensors across the furnace envelope to detect high-pressure pinhole steam leaks before secondary steam impingement washes adjacent tubes.",
          params: ["Acoustic Waveguide Spacing: 12 - 15m", "Frequency Band: 5 - 20 kHz", "Online UT Thickness Log: Every 8,000 Operating Hours"]
        }
      ]
    },

    odisha: {
      name: "Odisha",
      zone: "Eastern Mineral, Power & Maritime Belt",
      category: "coal",
      csi: 0.85,
      clusters: ["Jharsuguda (Vedanta Power/Smelter)", "Angul-Talcher (NTPC/NALCO/JSPL)", "Rourkela (SAIL Steel Plant)", "Paradeep (IOCL Refinery/Fertilizers)", "Kalinganagar (Tata Steel/Jindal)"],
      fuels: ["Talcher High-Moisture/Ash Coal", "Petcoke", "BF Gas & Coke Oven Gas", "Heavy Fuel Oil"],
      waterSource: "Brahmani & Mahanadi Rivers / Coastal Bay of Bengal Seawater",
      waterHardness: "Moderate to High Hardness (200-480 ppm), High Turbidity during Monsoon",
      exposureType: "marine",
      baseline: { ph: 8.9, do: 22, tds: 580, pressure: 140, sulfur: 1.4, flueTemp: 130 },
      vulnerabilities: [
        "Fireside molten alkali sulfate corrosion in superheaters burning high-chlorine, high-ash coal blends.",
        "Acid dew point condensation in APH and ESP cold zones due to sulfur trioxide in coastal humidity.",
        "Cooling water condenser tube leaks introducing chlorides into boiler condensate."
      ],
      controlPlan: [
        {
          title: "Tier 1: Condensate Polishing & Coordinated Phosphate Program",
          desc: "Install 100% full-flow Condensate Polishing Units (CPU) with deep-bed mixed resins to trap trace condenser seawater leaks. Maintain Coordinated Phosphate Treatment (CPT) with drum pH 9.2–9.8.",
          params: ["CPU Resins: Spherical Gel Cation/Anion", "Condenser Cl⁻ Trip: > 0.5 ppm", "Drum pH: 9.2 - 9.6"]
        },
        {
          title: "Tier 2: Cold-End Air Preheater Protection",
          desc: "Equip rotary regenerative Air Preheaters (Ljungström type) with low-temperature Corten-A enameled cold-end basket elements. Install high-pressure sootblowers with steam air preheaters (SCAPH).",
          params: ["APH Cold-End Metal: > 135 °C", "Basket Material: Vitreous Enamel Coated Corten", "Sootblowing Interval: Every 8 Hours"]
        },
        {
          title: "Tier 3: Waterwall Protective Cladding",
          desc: "Apply automated Inconel 625 (ERNiCrMo-3) spiral weld overlay cladding (2.0 mm thickness) on furnace waterwalls in low-NOx burner zones to resist reducing H₂S / FeS sulfidation attack.",
          params: ["Cladding Thickness: 2.0 mm", "Wire Spec: AWS A5.14 ERNiCrMo-3", "Iron Dilution: < 5.0%"]
        },
        {
          title: "Tier 4: Clarification & Sludge Blanket Optimization",
          desc: "Upgrade river water pre-treatment with Lamella Clarifiers and Polyaluminum Chloride (PAC) coagulation to manage monsoon turbidity spikes (>1500 NTU) and prevent colloidal silica fouling.",
          params: ["Settled Water Turbidity: < 2.0 NTU", "Coagulant: PAC + Cationic Polyelectrolyte", "Sludge Blowdown: Automated Timer"]
        },
        {
          title: "Tier 5: Specialized NDT & Metallurgy Monitoring",
          desc: "Deploy Low-Frequency Electromagnetic Technique (LFET) and Remote Field Eddy Current (RFEC) for high-speed scanning of boiler bank and economizer tubes during annual statutory overhauls.",
          params: ["Testing Method: LFET / RFEC", "Coverage: 100% High Risk Bends", "IBR Certificate: Form IV Renewal"]
        }
      ]
    },

    tamil_nadu: {
      name: "Tamil Nadu",
      zone: "Southern Coastal & Textile/Power Hub",
      category: "coastal",
      csi: 0.79,
      clusters: ["Tuticorin (Thermal Power & Chemical)", "Ennore-Manali (Petrochem/Power)", "Tirupur-Coimbatore (Textile Dyeing)", "Neyveli (Lignite Power Gencos)", "Mettur (Power & Aluminum)"],
      fuels: ["Imported Coal (Indonesia/South Africa)", "Neyveli Lignite", "Natural Gas", "Biomass Briquettes"],
      waterSource: "Bay of Bengal Desalination / Cauvery River / Groundwater Borewells",
      waterHardness: "High Salinity & Hardness (350-750 ppm CaCO₃, Cl⁻ 250-900 ppm)",
      exposureType: "marine",
      baseline: { ph: 8.9, do: 28, tds: 740, pressure: 90, sulfur: 1.1, flueTemp: 132 },
      vulnerabilities: [
        "Severe chloride-induced pitting & galvanic corrosion from coastal atmospheric aerosol intake.",
        "High-temperature alkali and chloride slagging from high-sodium Indonesian imported coals.",
        "Caustic embrittlement around riveted seams and rolled tube joints in older textile shell boilers."
      ],
      controlPlan: [
        {
          title: "Tier 1: Seawater SWRO Desalination & Demineralization",
          desc: "Operate Sea Water Reverse Osmosis (SWRO) with energy recovery turbines, followed by Two-Stage Brackish RO and Mixed Bed Polishers. Enforce All-Volatile Reducing Treatment (AVT-R) with Carbohydrazide scavenger.",
          params: ["SWRO Permeate TDS: < 250 ppm", "Final DM Water Cond.: < 0.1 µS/cm", "Carbohydrazide Residual: 20 - 40 ppb"]
        },
        {
          title: "Tier 2: Coastal Intake Air Filtration & Condensate Deaeration",
          desc: "Fit multi-stage marine-grade coalescing mist eliminator air filters on Forced Draft (FD) fan intakes to prevent airborne salt crystals (NaCl) from entering the furnace draft and combustion zone.",
          params: ["Filter Efficiency: 99.5% for aerosol > 2 µm", "Filter Spec: Hydrophobic Synthetic Media", "Deaerator O₂: < 5 ppb"]
        },
        {
          title: "Tier 3: Superheater & Economizer Metallurgical Upgrades",
          desc: "Specify SA213-T91 for high-temperature superheater coils and SA213-TP304H stainless steel for reheaters. Use heavy-wall SA210-C seamless carbon steel for economizer tubes with sacrificial erosion shields.",
          params: ["Superheater Alloy: SA213-T91", "Economizer Tube: SA210 Grade C", "Shield Material: 310 Stainless Steel"]
        },
        {
          title: "Tier 4: Lignite Ash Slag & Fouling Control",
          desc: "Dose magnesium-based fireside fuel additives (MgO/Mg(OH)₂) into combustion zones to raise coal ash fusion temperature and convert sticky pyrosulfates into friable, easily sootblown ash.",
          params: ["Ash Additive: Organo-Magnesium Slurry", "Dosing Rate: 1 kg per 10 T Fuel", "Ash Fusion Temp Increase: +65 °C"]
        },
        {
          title: "Tier 5: Eddy Current & Metallographic Replication",
          desc: "Perform in-situ In-Situ Metallographic Replication (replica metallography) to monitor carbide precipitation, spheroidization, and micro-cavity creep void formation in high-pressure superheater headers.",
          params: ["Replication Spots: Main Steam Header Welds", "Microstructural Evaluation: ASTM E1351", "Hardness Survey: < 235 HB"]
        }
      ]
    },

    uttar_pradesh: {
      name: "Uttar Pradesh",
      zone: "Northern Gangetic Agro-Sugar & Power Basin",
      category: "sugar",
      csi: 0.72,
      clusters: ["Muzaffarnagar-Meerut (Sugar Co-gen)", "Singrauli-Anpara (Mega Power Hub)", "Kanpur (Leather/Textile/Chemical)", "Renukoot (Aluminum/Chemicals)", "Noida-Ghaziabad (Industrial)"],
      fuels: ["Bagasse", "Northern Coalfields (NCL Coal)", "Biomass Husk", "Heavy Fuel Oil"],
      waterSource: "Ganges / Yamuna Rivers & Deep Indo-Gangetic Alluvial Aquifers",
      waterHardness: "High Calcium/Magnesium Bicarbonate Hardness (250-500 ppm CaCO₃)",
      exposureType: "inland_arid",
      baseline: { ph: 8.8, do: 32, tds: 510, pressure: 55, sulfur: 0.6, flueTemp: 142 },
      vulnerabilities: [
        "Carbonate scale buildup (CaCO₃/MgSiO₃) causing tube thermal insulation and localized blister blowout.",
        "Severe carbonic acid attack in low-pressure condensate return piping across sugar and textile clusters.",
        "Fly ash erosion on economizers in Singrauli mine-mouth thermal stations."
      ],
      controlPlan: [
        {
          title: "Tier 1: Softening & Polymeric Antiscalant Program",
          desc: "Deploy Strong Acid Cation (SAC) Softeners followed by RO. Dose synthetic polymaleic / polyacrylic sludge conditioners in boiler drum to disperse calcium phosphate sludges and allow continuous blowdown removal.",
          params: ["Feedwater Hardness: < 0.02 ppm as CaCO₃", "Drum Sludge Dispersant: 20 - 40 ppm", "Continuous Blowdown Rate: 2 - 4%"]
        },
        {
          title: "Tier 2: Condensate Neutralizing Amine Dosing",
          desc: "Continuously inject volatile neutralizing amine blends (Morpholine + Cyclohexylamine) at the deaerator outlet to maintain condensate return line pH at 8.8–9.2 across extensive factory steam networks.",
          params: ["Condensate Line pH: 8.8 - 9.2", "Iron in Condensate: < 20 ppb", "Amine Injection: Proportional to Steam Flow"]
        },
        {
          title: "Tier 3: Economizer Tube Sacrificial Baffles",
          desc: "Install stainless steel 304 angular clip-on erosion shields over top 3 rows of economizer tubes and return bends facing flue gas gas-turn lanes in high-ash coal-fired units.",
          params: ["Shield Material: SS 304 (2.5mm thick)", "Coverage: 120° Flue Gas Facing Arc", "Securing: Staggered Stitch Welds"]
        },
        {
          title: "Tier 4: Wet Layup During Seasonal Shutdown",
          desc: "Implement comprehensive IBR-approved seasonal preservation for sugar mill boilers using Sodium Sulfite (100–150 ppm) + Caustic Soda (pH 10.5–11.0) with weekly recirculation pumps.",
          params: ["Sodium Sulfite Residual: 100 - 150 ppm", "pH Level: 10.5 - 11.0", "Recirculation Run: 2 Hours Every 7 Days"]
        },
        {
          title: "Tier 5: Ultrasonic Thickness Gauging & IBR Inspection",
          desc: "Mandatory annual inspection under IBR 1950 Regulation 390 with ultrasonic thickness mapping of boiler shell plates, crown sheets, and smoke tubes.",
          params: ["UTG Mapping: Grid 150mm", "Hydro Test Pressure: 1.5x WP", "Certificate: IBR Form V & VI"]
        }
      ]
    },

    west_bengal: {
      name: "West Bengal",
      zone: "Eastern Deltaic Industrial & Power Hub",
      category: "coal",
      csi: 0.77,
      clusters: ["Durgapur-Asansol (Steel/Power)", "Haldia (Petrochemicals/Refinery)", "Kolkata-Howrah (Jute/Heavy Engg)", "Bandel-Kolaghat (Thermal Power)", "Kharagpur (Metallurgical)"],
      fuels: ["ECL High-Ash Coal", "Petcoke", "Blast Furnace Gas", "Biomass"],
      waterSource: "Hooghly / Damodar River Basins / Coastal Estuary",
      waterHardness: "Moderate to High Hardness (190-420 ppm), Coastal Saline Ingress in Haldia",
      exposureType: "marine",
      baseline: { ph: 8.9, do: 24, tds: 610, pressure: 120, sulfur: 1.0, flueTemp: 134 },
      vulnerabilities: [
        "Under-deposit pitting under heavy silt & colloidal iron deposits during monsoon river intake.",
        "Low-temperature sulfuric acid corrosion in APH baskets running petcoke and coal blends in Haldia.",
        "Flow-Accelerated Corrosion (FAC) in feedwater piping and deaerator downcomers."
      ],
      controlPlan: [
        {
          title: "Tier 1: Pre-Treatment Clarification & AVT(R) Chemistry",
          desc: "Use high-rate solids contact clarifiers (HRSCC) with micro-sand ballasting (Actiflo) to drop river silt and colloidal organics. Maintain AVT(R) with Carbohydrazide and neutral phosphate treatment.",
          params: ["Clarified Water Turbidity: < 1.0 NTU", "Feedwater Iron: < 10 ppb", "Feedwater Copper: < 2 ppb"]
        },
        {
          title: "Tier 2: Flow-Accelerated Corrosion (FAC) Prevention",
          desc: "Maintain feedwater pH strictly > 9.2 (or > 9.5 for mixed metallurgy). Inspect all high-turbulence piping elbows, tees, and orifice plates using digital radiography and pulsed eddy current.",
          params: ["Feedwater pH Target: 9.3 - 9.6", "FAC Inspection Grid: 50mm x 50mm", "Allowable Wall Loss: < 20% Nominal"]
        },
        {
          title: "Tier 3: Corrosion-Resistant Alloy Retrofits",
          desc: "Replace plain carbon steel boiler feed lines (SA106-B) in high-risk FAC zones with 1.25% Cr low-alloy steel (ASME SA335-P11 / P22). Use Corten-A steel in low-temperature flue gas ducts.",
          params: ["Piping Upgrade: SA335-P11 (Cr-Mo Alloy)", "Duct Material: Corten-A (ASTM A242)", "Welding Spec: GTAW with ER80S-B2"]
        },
        {
          title: "Tier 4: Flue Gas Temperature Control",
          desc: "Install modulating flue gas bypass dampers around the economizer to maintain minimum APH gas inlet temperature above 240°C during low-load operations, avoiding acid dew point condensation.",
          params: ["APH Gas Inlet: > 240 °C", "APH Air Outlet: > 190 °C", "Cold End Margin: +15 °C Above Tadp"]
        },
        {
          title: "Tier 5: Online Chemical Analyzers & Statutory Audits",
          desc: "Maintain multi-channel online analyzers for dissolved oxygen, sodium, cation conductivity, and silica with automated alarms connected to plant Distributed Control System (DCS).",
          params: ["DCS Sampling Frequency: 1 Second", "Alarm Limit: Cond. > 0.2 µS/cm", "Statutory Audit: Annual IBR Inspection"]
        }
      ]
    },

    jharkhand: {
      name: "Jharkhand",
      zone: "Eastern Coal Mining & Steel Corridor",
      category: "coal",
      csi: 0.86,
      clusters: ["Jamshedpur (Tata Steel/Tata Motors)", "Bokaro (Steel Authority of India)", "Dhanbad (Coal Mining/Coke Ovens)", "Ranchi (Heavy Engineering)", "Ramgarh (Sponge Iron/Pellet)"],
      fuels: ["Coking Coal Washery Rejects", "Coke Oven Gas (High H₂S)", "Blast Furnace Gas", "Thermal Coal"],
      waterSource: "Subarnarekha & Damodar River Systems / Deep Coal Mine Discharge",
      waterHardness: "Moderate to High Hardness (220-410 ppm), High Heavy Metals & Sulfate",
      exposureType: "industrial",
      baseline: { ph: 9.1, do: 16, tds: 480, pressure: 130, sulfur: 0.9, flueTemp: 142 },
      vulnerabilities: [
        "Severe fireside sulfidation and hydrogen embrittlement in coke-oven gas fired boilers.",
        "High-temperature superheater oxidation and coal ash slagging from 45% ash washery middlings.",
        "Turbine blade silica and iron oxide scaling."
      ],
      controlPlan: [
        {
          title: "Tier 1: Coke Oven Gas Desulfurization & AVT Chemistry",
          desc: "Scrub coke oven gas (H₂S removal via Stretford / vacuum carbonate plant) to keep fuel H₂S < 200 mg/Nm³. Enforce All-Volatile Treatment with high-purity ammonia and oxygen scavenger.",
          params: ["Fuel H₂S Limit: < 200 mg/Nm³", "Boiler Water pH: 9.0 - 9.4", "Cation Cond.: < 0.15 µS/cm"]
        },
        {
          title: "Tier 2: Superheater High-Temperature Metallurgy",
          desc: "Specify SA213-T91 for final superheater tubes and apply diffusion aluminizing or cold-spray NiCr coating to prevent alkali-sulfate induced accelerated hot corrosion.",
          params: ["Superheater Alloy: SA213-T91", "Coating: Cold-Spray NiCr (200 µm)", "Hot Corrosion Resistance: > 20,000 hrs"]
        },
        {
          title: "Tier 3: Waterwall Refractory & Studding Shielding",
          desc: "Apply high-alumina silicon carbide (SiC) refractory gunning over pin-studded waterwall tubes in the lower burner throat where reducing atmospheres exist.",
          params: ["Refractory Material: 85% Al₂O₃ - SiC", "Stud Density: 100 studs/m²", "Anchor Material: SS 310"]
        },
        {
          title: "Tier 4: Demineralization & Silica Monitoring",
          desc: "Run Reverse Osmosis + Mixed Bed demineralizers with continuous automated silica analyzers on drum blowdown to maintain drum silica within ASME/IS 10392 curve limits.",
          params: ["Silica Limit Drum: < 0.35 ppm at 130 bar", "Blowdown Trigger: Silica > 0.40 ppm", "Resin Regeneration: HCl + NaOH"]
        },
        {
          title: "Tier 5: Comprehensive NDT & Residual Life Assessment",
          desc: "Perform Residual Life Assessment (RLA) every 100,000 operating hours including oxide scale thickness measurement via high-frequency ultrasonic testing and replica metallography.",
          params: ["Oxide Scale Measurement: 20 MHz Ultrasonic", "Internal Steamside Oxide Limit: < 0.25 mm", "Creep Life Evaluation: Larson-Miller Parameter"]
        }
      ]
    },

    karnataka: {
      name: "Karnataka",
      zone: "Southern Industrial, Sugar & Coastal Belt",
      category: "sugar",
      csi: 0.73,
      clusters: ["Belagavi-Bagalkot (Sugar Co-gen)", "Ballari-Toranagallu (Jindal Steel & Power)", "Bengaluru-Peenya (Electronics/Pharma)", "Mangaluru (Refinery/Petrochem/Power)", "Mysuru (Paper & Textiles)"],
      fuels: ["Bagasse", "Imported Coal", "Domestic Coal", "Heavy Fuel Oil"],
      waterSource: "Krishna, Cauvery Rivers / Coastal Arabian Sea (Mangaluru)",
      waterHardness: "Moderate Hardness (180-360 ppm CaCO₃), High Coastal Salinity in Mangaluru",
      exposureType: "coastal",
      baseline: { ph: 8.9, do: 26, tds: 540, pressure: 75, sulfur: 0.9, flueTemp: 136 },
      vulnerabilities: [
        "Sugar mill condensate carbonic acid corrosion and boiler tube scale during fluctuating steam loads.",
        "Chloride pitting in seawater-cooled auxiliary heat exchangers and surface condensers in Mangaluru.",
        "Economizer tube erosion from abrasive bagasse char."
      ],
      controlPlan: [
        {
          title: "Tier 1: Condensate Quality Safeguards & AVT Chemistry",
          desc: "Install automated turbidity and refractive sugar detectors with 3-way dump valves to protect boiler from raw sugar contamination. Maintain All-Volatile Treatment with filming amine.",
          params: ["Sugar Dump Threshold: > 3 ppm", "Condensate pH: 8.8 - 9.2", "Drum Phosphate: 3 - 6 ppm"]
        },
        {
          title: "Tier 2: Titanium Condenser Tubing in Coastal Plants",
          desc: "Retrofit steam turbine condensers with ASTM B338 Grade 2 Titanium tubes to eliminate seawater leaks that trigger catastrophic waterwall chloride pitting.",
          params: ["Condenser Tubes: ASTM B338 Gr. 2 Titanium", "Tube Sheet: Titanium-Clad Steel", "Cathodic Protection: Impressed Current (ICCP)"]
        },
        {
          title: "Tier 3: Bagasse Char Erosion Protection",
          desc: "Fit half-shell stainless steel shields (SS 304) on economizer bends and enforce maximum flue gas velocity through tube banks below 11 m/s.",
          params: ["Flue Gas Velocity: < 11 m/s", "Shield Material: SS 304", "Ash Hopper Evacuation: Continuous"]
        },
        {
          title: "Tier 4: Seasonal Sugar Boiler Layup Protocol",
          desc: "Execute complete dry nitrogen layup (0.3 bar gauge) or wet layup with demineralized water containing 200 ppm Hydrazine and 10 ppm Ammonia during non-season.",
          params: ["N₂ Purity: > 99.5%", "Wet Layup Hydrazine: 200 ppm", "pH: 10.2 - 10.5"]
        },
        {
          title: "Tier 5: Ultrasonic Thickness & NDT Inspection",
          desc: "Annual thickness inspection of waterwalls and superheaters using multi-point D-meter ultrasonic probes per IBR standards.",
          params: ["Testing Standard: IBR Form XVI", "Hydrostatic Test: 1.5x WP", "UT Precision: ± 0.05 mm"]
        }
      ]
    },

    rajasthan: {
      name: "Rajasthan",
      zone: "Western Arid, Hard Water & Mineral Belt",
      category: "arid",
      csi: 0.78,
      clusters: ["Kota (Thermal Power & Fertilizers)", "Suratgarh-Chhabra (Super Thermal Power)", "Bhilwara (Textiles & Synthetic Fiber)", "Udaipur-Chanderiya (Zinc/Lead Smelters)", "Jaipur-Bhiwadi (Chemical/Engineering)"],
      fuels: ["High-Ash Coal", "Lignite (Barsingsar/Bikaner)", "Biomass Mustard Husk", "Petcoke"],
      waterSource: "Chambal & Indira Gandhi Canal / Highly Alkaline Groundwater Aquifers",
      waterHardness: "Extreme Hardness (450-850 ppm CaCO₃), High Fluoride & Alkalinity",
      exposureType: "inland_arid",
      baseline: { ph: 8.7, do: 34, tds: 920, pressure: 100, sulfur: 0.7, flueTemp: 144 },
      vulnerabilities: [
        "Rapid calcium/magnesium silicate scale formation in evaporator tubes due to extreme groundwater hardness.",
        "Under-deposit caustic gouging in textile and chemical processing factory boilers.",
        "High-abrasion fly ash erosion from Barsingsar lignite firing."
      ],
      controlPlan: [
        {
          title: "Tier 1: High-Recovery RO & Demineralization",
          desc: "Install High-Efficiency Reverse Osmosis (HERO) running at pH 10.5 to prevent silica scaling on RO membranes, followed by Mixed Bed Demineralization. Maintain Equilibrium Phosphate Treatment in drum.",
          params: ["RO Recovery Rate: > 85%", "Feedwater Silica: < 0.015 ppm", "Drum Equilibrium Phosphate: 1 - 3 ppm"]
        },
        {
          title: "Tier 2: Deaerator Performance & Dissolved O₂ Scavenging",
          desc: "Upgrade deaerator internal spray nozzles with 316L stainless steel spring-loaded heads. Dose catalyzed sodium sulfite or DEHA to maintain zero dissolved oxygen.",
          params: ["Deaerator Operating Temp: 105 - 110 °C", "Sulfite Residual: 20 - 40 ppm (for <40 bar)", "DO at Eco Inlet: < 5 ppb"]
        },
        {
          title: "Tier 3: Economizer & Waterwall Hardfacing",
          desc: "Apply plasma transferred arc (PTA) stellite or tungsten carbide cladding on boiler tubes subjected to abrasive silica-rich mustard husk and lignite fly ash.",
          params: ["Coating: PTA Tungsten Carbide", "Thickness: 1.5 mm", "Hardness: > 58 HRC"]
        },
        {
          title: "Tier 4: Flue Gas Temperature Optimization",
          desc: "Maintain flue gas exit temperature at 145–150°C during biomass husk firing to prevent cold-end moisture condensation and sticky chloride deposition.",
          params: ["Flue Gas Exit Temp: 145 - 150 °C", "Air Preheater Bypass: Automated Modulating", "Moisture in Fuel: < 12%"]
        },
        {
          title: "Tier 5: NDT Audit & Waterwall Scale Density Log",
          desc: "Perform annual tube sampling and laboratory chemical chordal deposit weight density analysis. Trigger acid cleaning when internal deposit exceeds 20 mg/cm².",
          params: ["Deposit Sampling: Hot Face Tube Section", "Clean Trigger: > 20 mg/cm²", "NDT Method: High-Resolution UTG"]
        }
      ]
    },

    andhra_pradesh: {
      name: "Andhra Pradesh",
      zone: "Eastern Coastal & Power/Pharma Belt",
      category: "coastal",
      csi: 0.81,
      clusters: ["Visakhapatnam (Refinery, Steel, Pharma)", "Krishnapatnam (Mega Thermal Power)", "Kakinada (Fertilizers/Ports)", "Vijayawada (Thermal Power Genco)", "Tirupati-Sri City (Engineering)"],
      fuels: ["Imported Coal (Indonesian/Australian)", "Domestic Coal", "Natural Gas (KG Basin)", "Petcoke"],
      waterSource: "Godavari/Krishna Canals / Bay of Bengal Seawater Desalination",
      waterHardness: "High Hardness & Coastal Salinity (320-680 ppm CaCO₃, Cl⁻ 200-750 ppm)",
      exposureType: "marine",
      baseline: { ph: 8.9, do: 25, tds: 680, pressure: 130, sulfur: 1.2, flueTemp: 132 },
      vulnerabilities: [
        "Coastal chloride aerosol acceleration of pitting in idle boilers and economizer tubes.",
        "Acid dew point condensation in APH cold baskets from high-sulfur petcoke combustion.",
        "Condenser cooling tube leaks in seawater-cooled thermal stations in Vizag & Krishnapatnam."
      ],
      controlPlan: [
        {
          title: "Tier 1: Seawater SWRO + Full-Stream Condensate Polishing",
          desc: "Operate SWRO + EDI water treatment trains. Equip high-pressure power and refinery boilers with 100% Condensate Polishing Units (CPU) with automated cation conductivity monitoring.",
          params: ["CPU Operating Mode: H-OH Mixed Bed", "Cation Conductivity: < 0.12 µS/cm", "Sodium in Steam: < 2 ppb"]
        },
        {
          title: "Tier 2: Deaerator Steam Trimming & Oxygen Scavenger",
          desc: "Maintain deaerator pegging steam pressure at 1.5 bar (112°C). Dose volatile organic oxygen scavenger (Carbohydrazide) with zero dissolved solids contribution.",
          params: ["DO Level: < 3 ppb", "Carbohydrazide Dosage: 1.4 ppm per ppm DO", "Deaerator Temp: 110 - 114 °C"]
        },
        {
          title: "Tier 3: Inconel 625 Cladding & Corten APH Elements",
          desc: "Apply 2.0mm Inconel 625 weld overlay on waterwall tubes in high heat flux furnace zones. Install enamel-coated Corten steel elements in the low-temperature APH baskets.",
          params: ["Clad Wire: AWS A5.14 ERNiCrMo-3", "APH Element: Corten Enamel", "Overlay Thickness: 2.0 mm"]
        },
        {
          title: "Tier 4: Flue Gas Temperature & Air Preheater Management",
          desc: "Maintain flue gas cold-end temperature > 138°C during petcoke cofiring to prevent sulfuric acid condensation and subsequent air heater fouling.",
          params: ["Min Flue Gas Temp: > 138 °C", "SCAPH Steam Heating: Active Below 70% Load", "Sootblower Pressure: 20 bar"]
        },
        {
          title: "Tier 5: Acoustic Tube Leak Detection & IBR Certification",
          desc: "Deploy online multi-sensor acoustic tube leak detection systems and perform annual ultrasonic wall mapping per IBR 1950 Regulation 390.",
          params: ["Acoustic Sensor Coverage: 100% Furnace", "Inspection: Annual UT Grid Mapping", "IBR Form: Renewal Form VI"]
        }
      ]
    },

    telangana: {
      name: "Telangana",
      zone: "Deccan Mining, Power & Bulk Pharma Corridor",
      category: "coal",
      csi: 0.76,
      clusters: ["Hyderabad-Pashamylaram (Pharma/Bulk Drugs)", "Ramagundam (NTPC Ultra-Mega Power)", "Mancherial-Kothagudem (SCCL Coal & Power)", "Bhadradri-Kothagudem (Heavy Industrial)", "Warangal (Textiles/Agro)"],
      fuels: ["SCCL High-Ash Domestic Coal", "Biomass Husk", "Heavy Fuel Oil", "Producer Gas"],
      waterSource: "Godavari & Krishna Basin Projects / Deep Fractured Granite Borewells",
      waterHardness: "High Mineral Hardness (280-550 ppm CaCO₃), Fluoride & Silica",
      exposureType: "industrial",
      baseline: { ph: 9.0, do: 22, tds: 520, pressure: 125, sulfur: 0.6, flueTemp: 138 },
      vulnerabilities: [
        "Silica scaling on boiler evaporator tubes and turbine blading from granitic groundwater.",
        "Flow-Accelerated Corrosion in pharma clean steam utility lines and deaerator discharge piping.",
        "High-temperature coal ash erosive wear from high-quartz SCCL coal."
      ],
      controlPlan: [
        {
          title: "Tier 1: Silica-Targeted Demineralization & Phosphate Chemistry",
          desc: "Run 2-Stage RO + Mixed Bed Demineralization with specialized silica-selective resins. Maintain Coordinated Phosphate Treatment (CPT) with Na:PO₄ ratio of 2.3–2.6 in the boiler drum.",
          params: ["Feedwater Silica: < 0.01 ppm", "Drum Silica: < 0.25 ppm", "Drum pH: 9.1 - 9.6"]
        },
        {
          title: "Tier 2: Deaerator Steam Trimming & FAC Mitigation",
          desc: "Maintain deaerator pegging pressure to ensure dissolved oxygen < 5 ppb. Replace plain carbon steel elbows in clean steam supply lines with ASME SA335-P11 alloy piping.",
          params: ["Piping Upgrade: SA335-P11 Alloy", "Deaerator Effluent DO: < 5 ppb", "Feedwater Velocity: < 2.8 m/s"]
        },
        {
          title: "Tier 3: Abrasive Wear Shields & Thermal Coatings",
          desc: "Install SS304 aerodynamic erosion shields over all upper economizer tube bends and sootblower lanes exposed to high-quartz Singareni coal ash.",
          params: ["Shield Material: SS 304 (3.0 mm)", "Coating: HVOF Tungsten Carbide on Bends", "Ash Quartz Content: > 28%"]
        },
        {
          title: "Tier 4: Flue Gas Temperature Control",
          desc: "Maintain flue gas exit temperature at 140°C. Implement automated steam sootblower sequencing to maintain heat transfer efficiency without thermal shocking tubes.",
          params: ["Flue Gas Exit Temp: 138 - 142 °C", "Sootblower Superheat: > 50 °C", "Blow Frequency: Every 6 Hours"]
        },
        {
          title: "Tier 5: NDT Audit & Ultrasonic Thickness Monitoring",
          desc: "Annual NDT thickness logging using digital A-scan ultrasonic thickness gauges and radiographic weld inspection per IBR rules.",
          params: ["Inspection Standard: IBR Form XVI", "Testing Frequency: Annual", "Wall Loss Limit: 15%"]
        }
      ]
    },

    punjab: {
      name: "Punjab",
      zone: "Northern Agricultural & Industrial Textile Hub",
      category: "sugar",
      csi: 0.70,
      clusters: ["Ludhiana (Textiles/Dyeing/Cycle)", "Bathinda (Thermal Power & Fertilizers)", "Amritsar (Textiles/Food Processing)", "Jalandhar (Leather/Forging)", "Hoshiarpur (Paper & Sugar Mills)"],
      fuels: ["Domestic Coal", "Paddy Straw / Biomass Pellets", "Bagasse", "Heavy Fuel Oil"],
      waterSource: "Sutlej/Beas Canals & Deep Indo-Gangetic Agricultural Borewells",
      waterHardness: "High Bicarbonate Hardness (240-480 ppm CaCO₃), Agricultural Nitrates",
      exposureType: "inland_arid",
      baseline: { ph: 8.8, do: 35, tds: 490, pressure: 50, sulfur: 0.5, flueTemp: 145 },
      vulnerabilities: [
        "Severe alkali chloride hot corrosion on superheaters from paddy straw (high potassium/chlorine biomass).",
        "Carbonic acid attack in extensive textile dyeing steam return piping.",
        "Under-deposit pitting during seasonal boiler shutdowns."
      ],
      controlPlan: [
        {
          title: "Tier 1: Water Softening, RO & Filming Amine Treatment",
          desc: "Operate dual-column cation softener + RO. Dose volatile neutralizing and filming polyamines to protect condensate network from carbonic acid attack.",
          params: ["Feedwater Hardness: < 0.05 ppm", "Condensate pH: 8.8 - 9.2", "Filming Amine Residual: 0.5 - 1.5 ppm"]
        },
        {
          title: "Tier 2: Biomass Fuel Chemical Additives",
          desc: "Co-inject sulfur or aluminum-silicate based additives (kaolin / coal ash) when burning paddy straw to convert low-melting KCl/NaCl into high-melting potassium aluminum silicates, preventing slagging.",
          params: ["Biomass Additive: 1.5% Kaolin Powder", "Ash Sintering Temp: +110 °C", "Chlorine in Fuel: < 0.25%"]
        },
        {
          title: "Tier 3: Superheater Tube Metallurgy Upgrade",
          desc: "Upgrade superheater loops firing paddy straw/biomass from carbon steel SA192 to ASME SA213-TP304H stainless steel to resist potassium chloride corrosion.",
          params: ["Superheater Alloy: SA213-TP304H", "Design Steam Temp: 480 °C", "Tube Wall Thickness: 4.5 mm"]
        },
        {
          title: "Tier 4: Dry Nitrogen Shutdown Preservation",
          desc: "Enforce complete nitrogen purging and 0.35 bar dry N₂ blanket during off-season shutdown periods to eliminate oxygen ingress and condensation pitting.",
          params: ["N₂ Purity: > 99.6%", "Blanket Pressure: 0.35 bar", "Oxygen Level: 0.0%"]
        },
        {
          title: "Tier 5: Annual IBR Inspection & Thickness Logging",
          desc: "Conduct annual ultrasonic thickness gauging and hydraulic testing under the supervision of the Punjab State Boiler Inspectorate (IBR Form V).",
          params: ["Inspection Code: IBR 1950", "Hydro Pressure: 1.5x Design WP", "Testing Grid: 100mm"]
        }
      ]
    },

    haryana: {
      name: "Haryana",
      zone: "Northern Industrial & Agro-Processing Corridor",
      category: "arid",
      csi: 0.71,
      clusters: ["Panipat (Refinery, Textiles, Power)", "Yamunanagar (Paper Mills & Sugar)", "Faridabad (Heavy Machinery/Chemicals)", "Jhajjar (Mega Thermal Power)", "Hisar (Stainless Steel & Pipe Mills)"],
      fuels: ["High-Ash Coal", "Petcoke", "Biomass / Mustard Straw", "Natural Gas"],
      waterSource: "Western Yamuna Canal & Deep Saline Borewell Aquifers",
      waterHardness: "High Hardness & TDS (300-600 ppm CaCO₃, Saline Subsoil)",
      exposureType: "inland_arid",
      baseline: { ph: 8.8, do: 30, tds: 560, pressure: 85, sulfur: 0.8, flueTemp: 140 },
      vulnerabilities: [
        "Acid dew point corrosion in APH running petcoke and coal in Panipat industrial cluster.",
        "Caustic gouging under porous iron oxide scales in high-heat waterwall tubes.",
        "Black liquor recovery boiler fireside sulfidation in Yamunanagar paper mills."
      ],
      controlPlan: [
        {
          title: "Tier 1: Two-Stage RO & Congruent Phosphate Chemistry",
          desc: "Operate dual-pass Reverse Osmosis followed by Mixed Bed polishers. Maintain Congruent Phosphate Treatment (CPT) in boiler drum to buffer against localized caustic gouging.",
          params: ["Feedwater Conductivity: < 0.2 µS/cm", "Drum PO₄: 4 - 8 ppm", "Na:PO₄ Ratio: 2.3 - 2.6"]
        },
        {
          title: "Tier 2: Deaeration & Oxygen Scavenger Control",
          desc: "Maintain deaerator pegging at 108°C with continuous Carbohydrazide / DEHA dosing to depress dissolved oxygen below 5 ppb.",
          params: ["DO at Economizer: < 5 ppb", "Deaerator Temp: 105 - 110 °C", "Scavenger Residual: 25 - 45 ppb"]
        },
        {
          title: "Tier 3: Recovery Boiler & Superheater Metallurgy",
          desc: "Use composite co-extruded tubes (Sanicro 38 / 304L stainless steel clad over carbon steel) for recovery boiler lower furnace waterwalls and superheaters.",
          params: ["Composite Tube: Sanicro 38 / SA210", "Clad Thickness: 1.65 mm", "Base Tube: SA210 Grade A1"]
        },
        {
          title: "Tier 4: Flue Gas Temperature Management",
          desc: "Maintain flue gas exit temperature above 142°C during petcoke cofiring to prevent sulfuric acid condensation in the tubular air preheater.",
          params: ["Flue Gas Exit Temp: 140 - 146 °C", "APH Metal Temp: > 135 °C", "Sootblower Medium: Superheated Steam"]
        },
        {
          title: "Tier 5: Ultrasonic & Magnetic Flux Leakage Testing",
          desc: "Annual thickness inspection of furnace tubes and steam drum using Magnetic Flux Leakage (MFL) and phased array ultrasonic testing.",
          params: ["NDT Protocol: MFL & PAUT", "Inspection Standard: IBR Form XVI", "Re-tubing Trigger: 20% Wall Loss"]
        }
      ]
    },

    madhya_pradesh: {
      name: "Madhya Pradesh",
      zone: "Central Mining, Thermal Power & Soya/Paper Belt",
      category: "coal",
      csi: 0.77,
      clusters: ["Singrauli (NTPC Waidhan/Sasan Power)", "Pithampur-Indore (Auto/Pharma)", "Bhopal (Heavy Electricals - BHEL)", "Nagda (Viscose Fiber/Chemicals)", "Amlai-Hoshangabad (Paper & Security Paper Mills)"],
      fuels: ["Northern Coalfields (NCL High-Ash Coal)", "Biomass Briquettes", "Heavy Fuel Oil"],
      waterSource: "Narmada, Betwa & Sone River Basins / Deep Mine Water",
      waterHardness: "Moderate to High Hardness (200-450 ppm CaCO₃), Moderate Silica",
      exposureType: "industrial",
      baseline: { ph: 9.0, do: 20, tds: 460, pressure: 140, sulfur: 0.5, flueTemp: 140 },
      vulnerabilities: [
        "High-temperature superheater coal ash corrosion from 45% ash Singrauli coal.",
        "Under-deposit hydrogen damage and caustic gouging in sub-critical power boilers.",
        "Carbonic acid attack in pulp & paper condensate systems."
      ],
      controlPlan: [
        {
          title: "Tier 1: Full Demineralization & AVT(O) / AVT(R) Chemistry",
          desc: "Operate Multi-Grade Filter + RO + Mixed Bed Demineralizer. Apply All-Volatile Oxidizing Treatment (AVT-O) with controlled oxygen injection (30–100 ppb) for units with all-ferrous metallurgy.",
          params: ["Cation Conductivity: < 0.10 µS/cm", "Feedwater Oxygen in AVT-O: 30 - 80 ppb", "Feedwater Iron: < 5 ppb"]
        },
        {
          title: "Tier 2: Deaerator Steam Trimming & Sootblower Superheat",
          desc: "Maintain deaerator operating pressure to keep dissolved oxygen < 3 ppb in reducing mode. Provide dry superheated steam (>280°C) to wall blowers to avoid thermal crack propagation.",
          params: ["Sootblower Steam Temp: > 280 °C", "Deaerator Temp: 110 - 115 °C", "Steam Drum Level Control: 3-Element PID"]
        },
        {
          title: "Tier 3: Superheater & Waterwall Metallurgy",
          desc: "Upgrade superheater loops to ASME SA213-T91/T92 with thermal spray Ni-Cr coating in high-temperature flue gas lanes. Install sacrificial erosion shields on economizer tube bends.",
          params: ["Superheater Alloy: SA213-T91", "Erosion Shield: SS 304 (3.0 mm)", "Waterwall Alloy: SA213-T11/T22"]
        },
        {
          title: "Tier 4: Chemical Cleaning Program",
          desc: "Conduct scheduled chemical cleaning using inhibited 6% EDTA when waterwall internal deposit weight density exceeds 25 mg/cm² to prevent tube overheat and hydrogen damage.",
          params: ["Deposit Clean Trigger: > 25 mg/cm²", "Cleaning Solution: Inhibited EDTA + Citric", "Passivation: Sodium Nitrite"]
        },
        {
          title: "Tier 5: Acoustic Leak Detection & RLA Surveys",
          desc: "Deploy multi-channel acoustic boiler tube leak detection systems across the furnace envelope with annual ultrasonic wall mapping per IBR norms.",
          params: ["Acoustic Sensors: 16 Channel Array", "Inspection: Annual UT Grid Mapping", "RLA Survey: Every 100,000 Hours"]
        }
      ]
    },

    kerala: {
      name: "Kerala",
      zone: "Tropical Coastal, High Humidity & Chemical/Rubber Belt",
      category: "coastal",
      csi: 0.75,
      clusters: ["Kochi-Eloor-Ambalamugal (Refineries/Fertilizers/FACT)", "Alappuzha (Coir & Agro)", "Palakkad (Industrial Estate)", "Thiruvananthapuram (Titanium/Chemicals)", "Kozhikode (Food/Plywood)"],
      fuels: ["Natural Gas (RLNG)", "Low-Sulfur Fuel Oil (LSFO)", "Biomass / Rubber Wood", "Petcoke"],
      waterSource: "Periyar / Pamba River Basins & Coastal Arabian Sea Estuaries",
      waterHardness: "Low to Moderate Hardness (80-220 ppm CaCO₃), High Atmospheric Humidity & Marine Salt",
      exposureType: "tropical_humid",
      baseline: { ph: 8.9, do: 28, tds: 380, pressure: 60, sulfur: 0.7, flueTemp: 130 },
      vulnerabilities: [
        "Atmospheric chloride-induced external stress corrosion cracking under insulation (CUI) on boiler piping in 90% RH tropical marine climate.",
        "Oxygen pitting in economizer tubes during frequent monsoon storm plant tripping.",
        "Acid dew point condensation in flue gas air preheaters during startup and low-load firing."
      ],
      controlPlan: [
        {
          title: "Tier 1: Demineralization & Organic Oxygen Scavenging",
          desc: "Run Reverse Osmosis + Mixed Bed Demineralizers. Dose volatile Carbohydrazide (1.4x DO stoichiometry) + Morpholine to prevent oxygen pitting in wet economizer headers.",
          params: ["Feedwater DO: < 5 ppb", "Feedwater pH: 9.0 - 9.4", "Condensate Conductivity: < 0.2 µS/cm"]
        },
        {
          title: "Tier 2: Corrosion Under Insulation (CUI) Barrier Coating",
          desc: "Apply thermally sprayed aluminum (TSA, 250 µm) or multi-coat cross-linked epoxy phenolic barrier coatings on all carbon steel and stainless steel steam lines beneath mineral wool insulation.",
          params: ["Coating: Thermally Sprayed Aluminum (TSA)", "Thickness: 250 - 300 µm", "Design Life Under CUI: > 25 Years"]
        },
        {
          title: "Tier 3: Marine-Grade Auxiliary Materials",
          desc: "Specify 316L stainless steel for all external instrument lines, sampling coolers, blowdown valves, and safety valve exhaust piping in coastal chemical zones.",
          params: ["Tubing Spec: ASTM A269 TP316L", "Fittings: 316L Double Ferrule", "Fasteners: ASTM A193 B8M / Gr. 316"]
        },
        {
          title: "Tier 4: Flue Gas SCAPH Preheating",
          desc: "Install Steam Coil Air Preheater (SCAPH) operating with auxiliary steam to preheat combustion air above 65°C during cold starts and monsoon downpours, preventing acid dew point condensation.",
          params: ["SCAPH Air Outlet: > 65 °C", "APH Cold End Temp: > 135 °C", "Fuel: Low-Sulfur RLNG / LSFO"]
        },
        {
          title: "Tier 5: Pulsed Eddy Current & Moisture CUI Scanning",
          desc: "Inspect insulated steam piping and boiler drum heads using non-intrusive Pulsed Eddy Current (PEC) and neutron moisture backscatter gauges without stripping insulation.",
          params: ["Testing Method: Pulsed Eddy Current (PEC)", "Inspection Coverage: 100% CUI Prone Welds", "IBR Annual Clearance: Form VI"]
        }
      ]
    },

    assam: {
      name: "Assam & North-East",
      zone: "North-Eastern High-Sulfur Coal, Oil & Paper Belt",
      category: "coal",
      csi: 0.84,
      clusters: ["Digboi-Numaligarh-Bongaigaon (Refineries)", "Dibrugarh-Tinsukia (Oil & Gas)", "Nagaon-Cachar (Paper Mills)", "Namrup (Fertilizers/Power)", "Guwahati (Petrochemicals/Tea Processing)"],
      fuels: ["Assam High-Organic-Sulfur Coal (S 2.5-4.5%)", "Natural Gas", "Crude Heavy Oil", "Bamboo & Wood Residue"],
      waterSource: "Brahmaputra River Basin / Subsurface Alluvial Aquifers",
      waterHardness: "Low to Moderate Hardness (100-240 ppm CaCO₃), High Silt & Organic Acids",
      exposureType: "tropical_humid",
      baseline: { ph: 8.8, do: 32, tds: 420, pressure: 70, sulfur: 3.2, flueTemp: 145 },
      vulnerabilities: [
        "Catastrophic low-temperature sulfuric acid dew point corrosion in economizers & APH from Assam coal (3.5% organic sulfur).",
        "High-temperature superheater fireside sulfidation and alkali sulfate attack.",
        "Black liquor recovery boiler smelt-water explosion risks and sulfide corrosion."
      ],
      controlPlan: [
        {
          title: "Tier 1: High-Sulfur Flue Gas Neutralization & AVT Chemistry",
          desc: "Inject dry hydrated lime or magnesium hydroxide slurry into the boiler flue gas duct prior to economizer and APH to neutralize SO₃. Maintain All-Volatile Treatment in feedwater.",
          params: ["Sorbant Injection: Ca(OH)₂ / Mg(OH)₂", "SO₃ Reduction Target: > 80%", "Feedwater pH: 9.0 - 9.4"]
        },
        {
          title: "Tier 2: Extreme Acid Dew Point Cold-End Management",
          desc: "Maintain flue gas exit temperature strictly > 160°C (due to extreme 3.5% S fuel). Fit APH with vitreous enamel coated Corten baskets and high-pressure hot air recirculating ducts.",
          params: ["Flue Gas Exit Temp: > 160 °C", "APH Element: Double Vitreous Enamel", "Hot Air Recirculation: 15% Flow"]
        },
        {
          title: "Tier 3: Superheater Metallurgy & Cladding Upgrades",
          desc: "Upgrade superheater tubes to ASME SA213-TP310S or apply 50% Ni - 50% Cr cladding to resist accelerated sulfide-trisulfate molten phase hot corrosion.",
          params: ["Superheater Alloy: SA213-TP310S", "Cladding: 50Ni - 50Cr Weld Overlay", "Tube Thickness: +2.0 mm Corrosion Allowance"]
        },
        {
          title: "Tier 4: Raw Water Clarification for High-Silt Monsoon",
          desc: "Operate Lamella high-rate settling clarifiers with coagulant aid dosing to handle Brahmaputra monsoon silt (>2000 NTU) and prevent mud deposition in lower boiler headers.",
          params: ["Clarifier Outflow: < 2.0 NTU", "Coagulant: PAC + Organic Polymer", "Mud Drum Blowdown: Automated Interval"]
        },
        {
          title: "Tier 5: Ultrasonic Scanning & Metallurgical Replication",
          desc: "Annual ultrasonic thickness profiling (100% grid) on APH cold-end tubes, economizer bends, and superheater loops under Assam Boiler Inspection Directorate.",
          params: ["Inspection Code: IBR 1950", "Testing Standard: Ultrasonic A-Scan", "Hydrostatic Pressure: 1.5x Design WP"]
        }
      ]
    },

    bihar: {
      name: "Bihar",
      zone: "Gangetic Agro-Sugar, Fertilizer & Power Hub",
      category: "sugar",
      csi: 0.71,
      clusters: ["Barauni (Refinery, Fertilizers & Power)", "Bhagalpur-Kahalgaon (NTPC Super Thermal)", "Harinagar-Gopalganj (Sugar Mills)", "Patna-Hajipur (Food Processing)", "Buxar (Thermal Power Project)"],
      fuels: ["Domestic High-Ash Coal", "Bagasse", "Natural Gas", "Heavy Fuel Oil"],
      waterSource: "Ganges / Gandak River Basins & Alluvial Groundwater",
      waterHardness: "Moderate to High Bicarbonate Hardness (220-420 ppm CaCO₃)",
      exposureType: "industrial",
      baseline: { ph: 8.8, do: 30, tds: 480, pressure: 80, sulfur: 0.6, flueTemp: 138 },
      vulnerabilities: [
        "Carbonate scaling and localized tube overheating in seasonal sugar bagasse boilers.",
        "Economizer fly ash erosion in Kahalgaon high-ash coal-fired thermal power stations.",
        "Oxygen pitting in idle co-gen units during post-crushing season."
      ],
      controlPlan: [
        {
          title: "Tier 1: Softening, RO & Coordinated Phosphate Chemistry",
          desc: "Operate dual-column cation softener + RO demineralizer. Maintain Coordinated Phosphate Treatment (CPT) with Na:PO₄ ratio of 2.4–2.6 in boiler drum to disperse calcium sludges.",
          params: ["Feedwater Hardness: < 0.05 ppm", "Drum Phosphate: 4 - 8 ppm", "Feedwater pH: 9.0 - 9.4"]
        },
        {
          title: "Tier 2: Deaerator Steam Trimming & Oxygen Scavenger",
          desc: "Maintain deaerator pegging steam at 105°C with continuous Sodium Sulfite / Carbohydrazide dosing to depress dissolved oxygen below 5 ppb.",
          params: ["DO at Economizer: < 5 ppb", "Deaerator Temp: 105 - 110 °C", "Scavenger Residual: 20 - 40 ppb"]
        },
        {
          title: "Tier 3: Economizer Sacrificial Erosion Baffles",
          desc: "Install stainless steel 304 sacrificial half-pipe shields over economizer tube bends facing flue gas turns in coal-fired utility boilers.",
          params: ["Shield Material: SS 304 (3.0 mm)", "Coverage: 120° Flue Gas Facing Arc", "Securing: Staggered Stitch Welds"]
        },
        {
          title: "Tier 4: Sugar Mill Wet Layup Protocol",
          desc: "Execute complete wet layup with demineralized water dosed with 200 ppm Sodium Sulfite and Caustic Soda (pH 10.5) during non-crushing season with weekly pump recirculation.",
          params: ["Sodium Sulfite Residual: 200 ppm", "pH Level: 10.5 - 11.0", "Recirculation Run: 2 Hours Every 7 Days"]
        },
        {
          title: "Tier 5: Annual IBR Inspection & Thickness Logging",
          desc: "Annual ultrasonic thickness gauging and hydraulic testing per Indian Boiler Regulations (IBR Form V & VI).",
          params: ["Inspection Code: IBR 1950", "Testing Standard: D-Meter UTG", "Wall Loss Limit: 15%"]
        }
      ]
    },

    himachal_pradesh: {
      name: "Himachal Pradesh",
      zone: "Sub-Himalayan Pharma, Cement & Textile Corridor",
      category: "arid",
      csi: 0.68,
      clusters: ["Baddi-Barotiwala-Nalagarh (Mega Pharma Hub)", "Kala Amb (Paper/Chemicals)", "Solan (Food/Brewery)", "Bilaspur-Darlaghat (Cement Plant Boilers)", "Una (Textiles & Industrial)"],
      fuels: ["Biomass Briquettes", "Low-Ash Coal", "Petcoke (Cement Waste Heat)", "Diesel / LPG"],
      waterSource: "Himalayan Glacial Streams / Subsurface Mountain Aquifers",
      waterHardness: "Moderate to High Calcium Bicarbonate Hardness (160-380 ppm CaCO₃), Cold Water Intake",
      exposureType: "inland_arid",
      baseline: { ph: 8.9, do: 38, tds: 320, pressure: 40, sulfur: 0.4, flueTemp: 142 },
      vulnerabilities: [
        "High dissolved oxygen pitting in economizers due to cold (8-15°C) mountain feedwater intake.",
        "Flow-Accelerated Corrosion in pharma clean steam utility lines and condensate networks.",
        "Carbonic acid attack in uninsulated condensate return systems during freezing winters."
      ],
      controlPlan: [
        {
          title: "Tier 1: Pre-Heating & Thermal Deaeration",
          desc: "Install high-efficiency flash steam economizer preheaters to raise raw makeup water temperature from 10°C to >65°C before the deaerator. Dose volatile neutralizing amines.",
          params: ["Raw Water Pre-Heat: > 65 °C", "Deaerator Temp: 105 °C", "Feedwater DO: < 5 ppb"]
        },
        {
          title: "Tier 2: Clean Steam Pharma Metallurgy",
          desc: "Fabricate pure steam generators and clean steam distribution networks from electro-polished ASME BPE compliant 316L stainless steel (Ra < 0.51 µm) with orbital welding.",
          params: ["Material: 316L SS (ASME BPE)", "Surface Finish: Ra < 0.51 µm (Electro-polished)", "Welding: Automated Orbital GTAW"]
        },
        {
          title: "Tier 3: Condensate Heat Insulation & Freezing Protection",
          desc: "Provide 75mm closed-cell mineral wool insulation with weatherproof aluminum cladding on all external condensate lines to avoid sub-cooling and severe carbonic acid dissolution.",
          params: ["Insulation: 75mm Mineral Wool", "Cladding: 22 SWG Aluminum", "Condensate Return Temp: > 85 °C"]
        },
        {
          title: "Tier 4: Softening & Polymeric Conditioning",
          desc: "Run automated twin-alternating ion-exchange softeners with continuous polymer dosing to prevent crystalline calcite scaling during load fluctuations.",
          params: ["Feedwater Hardness: < 0.02 ppm", "Polymer Dosage: 15 - 25 ppm", "Blowdown: Automated TDS Proportional"]
        },
        {
          title: "Tier 5: Ultrasonic & Dye Penetrant Testing",
          desc: "Annual NDT thickness inspection and liquid dye penetrant inspection of all boiler nozzle welds per IBR standards.",
          params: ["Inspection Standard: IBR Form XVI", "NDT Method: UTG & DPT", "Hydrostatic Test: 1.5x Design WP"]
        }
      ]
    }
  };

  // =========================================================================
  // 2. BOILER SUB-SYSTEM ANATOMY & DEGRADATION DATABASE
  // =========================================================================
  const BOILER_COMPONENTS = {
    economizer: {
      name: "Economizer Tubes & Inlet Headers",
      tempRange: "180 °C – 280 °C (Water-Side) | 320 °C – 420 °C (Gas-Side)",
      location: "Upper boiler backpass prior to Air Preheater (APH)",
      mechanisms: "Dissolved Oxygen (DO) Localized Pitting, Flow-Accelerated Corrosion (FAC) at inlet bends, Fly Ash Erosion Scour.",
      description: "The economizer preheats incoming feedwater using residual flue gas heat. Because feedwater enters directly after the deaerator, any dissolved oxygen slip (>7 ppb) causes rapid localized micro-galvanic pitting beneath porous ferric oxide tubercles. Additionally, high ash content in Indian coals causes severe mechanical thinning on top tube rows.",
      vulnerableAlloys: "Carbon Steel (ASME SA192, SA210-A1)",
      upgradeAlloys: "Heavy-Wall SA210 Grade C with 310 Stainless Steel clip-on erosion shields or Inconel weld cladding.",
      mitigation: "Strict deaerator thermal pegging (>105°C), catalyzed oxygen scavengers (Carbohydrazide residual 25 ppb), maintain feedwater velocity < 2.5 m/s, and install sacrificial erosion shields on tube bends."
    },
    waterwalls: {
      name: "Furnace Waterwall & Evaporator Tubes",
      tempRange: "280 °C – 370 °C (Saturated Water/Steam) | 800 °C – 1400 °C (Flame Radiative)",
      location: "Combustion chamber perimeter walls",
      mechanisms: "Under-Deposit Caustic Gouging, Departure from Nucleate Boiling (DNB) Steam Blanketing, Hydrogen Damage, Low-NOx H₂S Sulfidation.",
      description: "Waterwalls absorb intense radiative furnace heat. When porous magnetite or porous iron/copper sludge deposits accumulate on the internal hot-face, boiler water seeps under the deposit and boils into pure steam, concentrating sodium hydroxide (NaOH) to thousands of ppm. This creates localized caustic gouging and hydrogen embrittlement. On the fireside, reducing conditions generate H₂S which attacks mild steel.",
      vulnerableAlloys: "Carbon Steel (SA210-A1, SA192)",
      upgradeAlloys: "Rifled / Multi-lead ribbed tubes in SA213-T11/T22 with 2.0mm automated Inconel 625 (ERNiCrMo-3) weld overlay.",
      mitigation: "Maintain Congruent/Equilibrium Phosphate Treatment (Na:PO₄ ratio 2.3–2.6), chemical clean with EDTA when internal deposit exceeds 25 mg/cm², and apply weld overlay cladding in low-NOx burner zones."
    },
    superheater: {
      name: "Superheater & Reheater Coils (Platen & Pendant)",
      tempRange: "450 °C – 585 °C (High-Pressure Superheated Steam) | 750 °C – 1100 °C (Flue Gas)",
      location: "Furnace exit and horizontal convection pass",
      mechanisms: "High-Temperature Fireside Ash Corrosion (Alkali Iron Trisulfates), Chloride Stress Corrosion Cracking (SCC), Creep Rupture, Steamside Oxidation.",
      description: "Superheaters operate at peak steam temperatures. Molten alkali-iron trisulfates (Na₃Fe(SO₄)₃ and K₃Fe(SO₄)₃) formed from coal ash attack the protective chromium oxide scale. Steamside growth of thick magnetite insulating layers increases metal temperature, causing accelerated creep void nucleation and rupture.",
      vulnerableAlloys: "Low-Alloy Steel (SA213-T11, T22)",
      upgradeAlloys: "ASME SA213-T91 (9Cr-1Mo-V), T92, and austenitic stainless steels SA213-TP347H / TP310S.",
      mitigation: "Limit internal steam oxidation thickness (<0.25 mm), utilize high-temperature creep alloys (T91/T92), avoid steam temperature swings > 10°C, and use dry sonic or superheated steam sootblowers."
    },
    drum: {
      name: "Steam Drum & Mud Drum",
      tempRange: "260 °C – 360 °C | Pressures 40 – 180 bar",
      location: "Top and bottom junctions of the recirculating boiler loop",
      mechanisms: "Caustic Embrittlement along rolled joints/seams, Thermal Fatigue Cracking, Pinhole Pitting during cold layup.",
      description: "The steam drum separates saturated steam from water using internal cyclones and chevron scrubbers. Cyclic thermal stresses during startups/trips induce mechanical micro-cracks along nozzle downcomers. High free caustic alkalinity migrates into grain boundaries causing intergranular stress cracking (caustic embrittlement).",
      vulnerableAlloys: "Boiler Plate (ASME SA515 Gr. 70, SA516 Gr. 70)",
      upgradeAlloys: "ASME SA299 / SA533 Type B Class 1 micro-alloyed with internal austenitic stainless cladding.",
      mitigation: "Eliminate free NaOH by adopting All-Volatile or Coordinated Phosphate chemistry, adhere strictly to ramp-up heat rates (<55°C/hr), and maintain dry N₂ or wet sulfite preservation during shutdowns."
    },
    aph: {
      name: "Air Preheater (APH) & Flue Gas Ducting",
      tempRange: "80 °C – 180 °C (Cold-End Flue Gas / Intake Air)",
      location: "Downstream of economizer prior to Dust Collector / ESP & Chimney",
      mechanisms: "Low-Temperature Sulfuric Acid Dew Point (SO₃) Condensation, Ash Plugging, Atmospheric Corrosion.",
      description: "When burning fuels containing sulfur (coal, petcoke, heavy oil), 1–3% of SO₂ oxidizes into SO₃. In the presence of moisture, SO₃ forms vaporized H₂SO₄. When flue gas metal temperature drops below the acid dew point (typically 120°C–155°C depending on fuel sulfur), liquid concentrated sulfuric acid condenses directly on metal baskets, destroying tubes within months.",
      vulnerableAlloys: "Mild Carbon Steel (IS 2062, ASTM A36)",
      upgradeAlloys: "Corten-A (ASTM A242) weathering steel and double-coat vitreous enamel coated steel baskets.",
      mitigation: "Install Steam Coil Air Preheater (SCAPH) to keep cold-end metal temperature strictly > T_adp + 15°C margin, inject Magnesium Oxide (MgO) flue gas additives, and use sonic sootblowers."
    },
    deaerator: {
      name: "Deaerator & Condensate Return Network",
      tempRange: "85 °C – 130 °C | Pressure 0.2 – 2.5 bar",
      location: "Boiler feedwater pump suction supply vessel & condensate return header",
      mechanisms: "Flow-Accelerated Corrosion (FAC), Carbonic Acid (H₂CO₃) Dissolution, Oxygen Impingement Pitting.",
      description: "Condensate returning from factories dissolves atmospheric CO₂, forming carbonic acid which strips protective oxides from carbon steel pipe elbows and threaded joints. In the deaerator vessel, steam-water impingement zones suffer severe single-phase FAC.",
      vulnerableAlloys: "Carbon Steel (ASTM A106 Grade B, A53)",
      upgradeAlloys: "ASME SA335-P11 alloy piping or 304L/316L stainless steel for deaerator trays and spray nozzles.",
      mitigation: "Dose volatile neutralizing filming amines (Morpholine / Cyclohexylamine) to maintain condensate pH 8.8–9.2, ensure deaerator pegging steam is continuous, and use alloy P11 at high-velocity discharge elbows."
    }
  };

  // =========================================================================
  // 3. COMPUTATIONAL PREDICTIVE CORROSION ENGINE (Thermodynamic Models)
  // =========================================================================
  function calculateCorrosionEngine(params) {
    const { ph, doPpb, tdsPpm, pressureBar, sulfurPct, flueTempC, exposure } = params;

    // 1. pH Factor (Parabolic Pourbaix Magnetite Stability Model)
    // Stable passive magnetite Fe3O4 forms between pH 9.2 - 10.5
    let phFactor = 1.0;
    if (ph < 9.0) {
      phFactor = 1.0 + Math.pow((9.0 - ph) * 1.8, 1.6); // Acid attack acceleration
    } else if (ph > 10.5) {
      phFactor = 1.0 + Math.pow((ph - 10.5) * 2.2, 1.4); // Caustic gouging / amphoteric dissolution
    } else {
      phFactor = 0.45 + (Math.abs(ph - 9.8) * 0.3); // Minimum corrosion rate in passive zone
    }

    // 2. Dissolved Oxygen Factor (Electrochemical Cathodic Depolarization)
    // Pitting rate proportional to [DO]^0.75
    const doFactor = 1.0 + Math.pow(doPpb / 10.0, 0.78) * 0.45;

    // 3. TDS & Chloride Factor (Conductivity & Passive Film Breakdown)
    let envBonus = 1.0;
    if (exposure === "marine") envBonus = 1.35;
    else if (exposure === "industrial") envBonus = 1.20;
    else if (exposure === "tropical_humid") envBonus = 1.15;

    const tdsFactor = (1.0 + Math.pow(tdsPpm / 400.0, 0.70) * 0.35) * envBonus;

    // 4. Pressure & Thermal Stress Factor
    const pressureFactor = 1.0 + Math.pow(pressureBar / 60.0, 0.65) * 0.25;

    // 5. Flue Gas Sulfuric Acid Dew Point Model (Verhoff-Banchero Equation)
    // Partial pressures of H2O and SO3 estimated from fuel sulfur %
    const pH2O = 0.10; // ~10% moisture in flue gas
    const pSO3 = Math.max(0.000001, (sulfurPct * 0.000045)); // SO3 partial pressure
    
    // Verhoff-Banchero Acid Dew Point (T_adp in Celsius)
    const logH2O = Math.log10(pH2O);
    const logSO3 = Math.log10(pSO3);
    const tAdpK = 203.25 + 27.6 * logH2O + 10.83 * logSO3 + 1.06 * Math.pow(logSO3 + 8.0, 2.8);
    const acidDewPointC = Math.max(90.0, Math.min(168.0, tAdpK - 273.15 + 18.0));

    // Acid condensation penalty if flue gas temperature falls below dew point + safety margin
    let acidDewRate = 0.0;
    if (flueTempC < acidDewPointC) {
      const deltaT = acidDewPointC - flueTempC;
      acidDewRate = Math.pow(deltaT / 8.0, 1.5) * (sulfurPct * 1.6);
    } else if (flueTempC < acidDewPointC + 10.0) {
      acidDewRate = (acidDewPointC + 10.0 - flueTempC) * 0.25 * sulfurPct;
    }

    // Base corrosion rate for bare carbon steel in pure water (~0.4 mpy)
    const baseRateMpy = 0.45;
    const watersideRate = baseRateMpy * phFactor * doFactor * tdsFactor * pressureFactor;
    const totalCorrosionRateMpy = watersideRate + acidDewRate;
    const totalCorrosionRateMmYr = totalCorrosionRateMpy * 0.0254;

    // Estimated Remaining Useful Life (RUL)
    // Typical waterwall tube: 5.0mm nominal, 2.5mm minimum retire thickness
    const availableWearMm = 2.5;
    const estimatedLifeYears = Math.min(30.0, Math.max(0.8, availableWearMm / Math.max(0.01, totalCorrosionRateMmYr)));

    // Factor Contribution Percentages
    const rawDO = Math.max(0.1, (doFactor - 1.0) * 40.0);
    const rawTDS = Math.max(0.1, (tdsFactor - 1.0) * 35.0);
    const rawAcid = Math.max(0.1, acidDewRate * 45.0);
    const rawPH = Math.max(0.1, (phFactor - 0.45) * 30.0);
    const rawStress = Math.max(0.1, (pressureFactor - 1.0) * 20.0);
    const sumFactors = rawDO + rawTDS + rawAcid + rawPH + rawStress;

    const pctDO = Math.round((rawDO / sumFactors) * 100);
    const pctTDS = Math.round((rawTDS / sumFactors) * 100);
    const pctAcid = Math.round((rawAcid / sumFactors) * 100);
    const pctPH = Math.round((rawPH / sumFactors) * 100);
    const pctStress = Math.max(1, 100 - (pctDO + pctTDS + pctAcid + pctPH));

    // Severity Classification
    let severity = "LOW";
    let badgeClass = "badge-low";
    if (totalCorrosionRateMpy > 10.0) {
      severity = "SEVERE / CRITICAL FAILURE";
      badgeClass = "badge-severe";
    } else if (totalCorrosionRateMpy > 5.0) {
      severity = "HIGH CORROSION RISK";
      badgeClass = "badge-high";
    } else if (totalCorrosionRateMpy > 2.0) {
      severity = "MODERATE CORROSION";
      badgeClass = "badge-mod";
    } else {
      severity = "LOW / CONTROLLED CORROSION";
      badgeClass = "badge-low";
    }

    // Active Hazard Alert determination
    let alertTitle = "Normal Boiler Chemistry Profile";
    let alertDesc = "Operational parameters are within baseline ASME Section VII & IS 10392 guidelines. Magnetite passive film is stable.";

    if (acidDewRate > 2.0) {
      alertTitle = `CRITICAL: Low-Temperature Sulfuric Acid Dew Point Condensation (T_adp = ${acidDewPointC.toFixed(1)}°C)`;
      alertDesc = `Flue gas exit temperature (${flueTempC}°C) is BELOW the calculated acid dew point (${acidDewPointC.toFixed(1)}°C). High-strength liquid H₂SO₄ is condensing directly on APH and economizer baskets.`;
    } else if (doPpb > 20) {
      alertTitle = `HIGH: Dissolved Oxygen Pitting in Economizer & Feed Lines (${doPpb} ppb DO)`;
      alertDesc = `Dissolved oxygen exceeds 10 ppb threshold. High risk of localized deep pitting and pinhole leaks along cold economizer inlet headers.`;
    } else if (ph < 8.8) {
      alertTitle = `ACIDIC ATTACK: Low Boiler Water pH (${ph})`;
      alertDesc = `Feedwater pH is acidic. Protective magnetite (Fe₃O₄) passive film cannot form, causing general acidic thinning and hydrogen dissolution.`;
    } else if (ph > 10.8) {
      alertTitle = `CAUSTIC GOUGING: Excess Boiler Alkalinity (pH ${ph})`;
      alertDesc = `High free caustic concentration. Risk of caustic gouging beneath porous waterwall sludges and caustic embrittlement along stressed tube joints.`;
    } else if (tdsPpm > 1200) {
      alertTitle = `HIGH SALINITY: Excessive Boiler Water TDS (${tdsPpm} ppm)`;
      alertDesc = `High dissolved solids increase carryover into superheaters and accelerate under-deposit concentration cells in high-heat evaporator tubes.`;
    }

    return {
      rateMpy: totalCorrosionRateMpy,
      rateMmYr: totalCorrosionRateMmYr,
      acidDewPointC,
      estimatedLifeYears,
      severity,
      badgeClass,
      weights: { pctDO, pctTDS, pctAcid, pctPH, pctStress },
      alert: { title: alertTitle, desc: alertDesc }
    };
  }

  // =========================================================================
  // 4. UI CONTROLLER & EVENT WIRING
  // =========================================================================
  let currentStateId = "gujarat";
  let currentComponentId = "economizer";
  let activeFilter = "all";

  const dom = {
    stateSelectDropdown: document.getElementById("stateSelectDropdown"),
    regionFilters: document.getElementById("regionFilters"),
    indiaMapContainer: document.getElementById("indiaMapContainer"),
    mapHoverInfo: document.getElementById("mapHoverInfo"),
    kpiCurrentStateName: document.getElementById("kpiCurrentStateName"),
    kpiCurrentRisk: document.getElementById("kpiCurrentRisk"),

    // Simulator Sliders & Badges
    pHInput: document.getElementById("pHInput"),
    pHVal: document.getElementById("pHVal"),
    doInput: document.getElementById("doInput"),
    doVal: document.getElementById("doVal"),
    tdsInput: document.getElementById("tdsInput"),
    tdsVal: document.getElementById("tdsVal"),
    pressureInput: document.getElementById("pressureInput"),
    pressureVal: document.getElementById("pressureVal"),
    sulfurInput: document.getElementById("sulfurInput"),
    sulfurVal: document.getElementById("sulfurVal"),
    flueTempInput: document.getElementById("flueTempInput"),
    flueTempVal: document.getElementById("flueTempVal"),
    exposureTypeSelect: document.getElementById("exposureTypeSelect"),
    resetSimBtn: document.getElementById("resetSimBtn"),

    // Simulator Outputs
    predictedRateDisplay: document.getElementById("predictedRateDisplay"),
    predictedRateMetric: document.getElementById("predictedRateMetric"),
    severityBadge: document.getElementById("severityBadge"),
    tubeLifeDisplay: document.getElementById("tubeLifeDisplay"),
    acidDewPointDisplay: document.getElementById("acidDewPointDisplay"),
    pctDO: document.getElementById("pctDO"),
    barDO: document.getElementById("barDO"),
    pctTDS: document.getElementById("pctTDS"),
    barTDS: document.getElementById("barTDS"),
    pctAcid: document.getElementById("pctAcid"),
    barAcid: document.getElementById("barAcid"),
    pctPH: document.getElementById("pctPH"),
    barPH: document.getElementById("barPH"),
    pctStress: document.getElementById("pctStress"),
    barStress: document.getElementById("barStress"),
    alertTitle: document.getElementById("alertTitle"),
    alertDesc: document.getElementById("alertDesc"),

    // Component Tabs
    componentTabs: document.getElementById("componentTabs"),
    componentDetailCard: document.getElementById("componentDetailCard"),

    // State Plan Section
    selectedStateHeaderTitle: document.getElementById("selectedStateHeaderTitle"),
    stateClustersList: document.getElementById("stateClustersList"),
    stateEnvSpecs: document.getElementById("stateEnvSpecs"),
    stateFuelsList: document.getElementById("stateFuelsList"),
    stateVulnerabilitiesList: document.getElementById("stateVulnerabilitiesList"),
    controlPlanStepsContainer: document.getElementById("controlPlanStepsContainer"),

    // Matrix Table
    tableSearchInput: document.getElementById("tableSearchInput"),
    statesTableBody: document.getElementById("statesTableBody"),
    exportCsvBtn: document.getElementById("exportCsvBtn"),

    // Modal & Audit
    quickAuditBtn: document.getElementById("quickAuditBtn"),
    auditModal: document.getElementById("auditModal"),
    auditModalBody: document.getElementById("auditModalBody"),
    auditModalSubtitle: document.getElementById("auditModalSubtitle"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    closeModalBtn2: document.getElementById("closeModalBtn2"),
    printAuditBtn: document.getElementById("printAuditBtn")
  };

  // Populate Dropdown
  function populateStateDropdown() {
    dom.stateSelectDropdown.innerHTML = "";
    Object.keys(STATE_DATABASE).forEach(key => {
      const st = STATE_DATABASE[key];
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = `${st.name} (${st.zone.split("&")[0].trim()})`;
      dom.stateSelectDropdown.appendChild(opt);
    });
    dom.stateSelectDropdown.value = currentStateId;
  }

  // Render SVG Map of India (High-Precision Stylized Vector Map)
  function renderIndiaMap() {
    // Coordinate geometry paths for Indian states
    const SVG_MAP_PATHS = {
      gujarat: "M 90 280 L 135 260 L 175 270 L 180 325 L 140 345 L 95 330 L 70 300 Z",
      maharashtra: "M 140 345 L 180 325 L 240 320 L 260 380 L 210 430 L 160 410 L 140 350 Z",
      rajasthan: "M 130 180 L 195 160 L 225 210 L 190 265 L 135 260 L 115 220 Z",
      madhya_pradesh: "M 190 265 L 225 210 L 300 230 L 330 290 L 270 320 L 190 270 Z",
      chhattisgarh: "M 285 295 L 335 285 L 340 370 L 300 405 L 280 350 Z",
      odisha: "M 335 285 L 390 295 L 395 365 L 340 370 Z",
      uttar_pradesh: "M 225 170 L 310 160 L 360 220 L 300 230 L 225 210 Z",
      bihar: "M 360 215 L 425 210 L 430 255 L 365 260 Z",
      west_bengal: "M 425 210 L 450 200 L 440 310 L 400 320 L 420 260 Z",
      jharkhand: "M 365 255 L 420 255 L 415 305 L 345 295 Z",
      karnataka: "M 160 410 L 210 430 L 215 500 L 180 520 L 160 450 Z",
      andhra_pradesh: "M 210 430 L 260 380 L 320 400 L 260 510 L 215 500 Z",
      telangana: "M 215 375 L 275 360 L 290 415 L 230 430 Z",
      tamil_nadu: "M 180 520 L 235 505 L 245 580 L 195 595 L 180 540 Z",
      kerala: "M 165 520 L 185 520 L 195 595 L 170 585 Z",
      punjab: "M 155 125 L 190 120 L 195 160 L 155 160 Z",
      haryana: "M 190 125 L 225 140 L 220 185 L 185 165 Z",
      himachal_pradesh: "M 185 85 L 225 90 L 220 135 L 185 125 Z",
      assam: "M 470 190 L 530 185 L 535 220 L 475 225 Z"
    };

    let svgHtml = `
      <svg class="india-svg" viewBox="50 50 520 570" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGlow)" />
        <g id="statesGroup">
    `;

    Object.keys(SVG_MAP_PATHS).forEach(id => {
      const st = STATE_DATABASE[id];
      if (!st) return;

      let fill = "#10b981"; // Low
      if (st.csi > 0.82) fill = "#ef4444"; // Severe
      else if (st.csi > 0.75) fill = "#f97316"; // High
      else if (st.csi > 0.70) fill = "#f59e0b"; // Mod

      const isSelected = id === currentStateId ? "selected" : "";
      svgHtml += `
        <path id="state-path-${id}" class="state-path ${isSelected}" d="${SVG_MAP_PATHS[id]}" fill="${fill}" data-id="${id}">
          <title>${st.name} — ${st.zone} (CSI: ${st.csi})</title>
        </path>
      `;
    });

    // State text labels
    svgHtml += `
          <text x="110" y="300" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">GJ</text>
          <text x="180" y="375" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">MH</text>
          <text x="155" y="215" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">RJ</text>
          <text x="235" y="270" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">MP</text>
          <text x="295" y="340" font-size="9" font-family="JetBrains Mono" fill="#fff" font-weight="bold">CG</text>
          <text x="355" y="335" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">OD</text>
          <text x="270" y="195" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">UP</text>
          <text x="385" y="235" font-size="9" font-family="JetBrains Mono" fill="#fff" font-weight="bold">BR</text>
          <text x="415" y="295" font-size="9" font-family="JetBrains Mono" fill="#fff" font-weight="bold">WB</text>
          <text x="380" y="280" font-size="8" font-family="JetBrains Mono" fill="#fff" font-weight="bold">JH</text>
          <text x="175" y="470" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">KA</text>
          <text x="255" y="460" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">AP</text>
          <text x="240" y="400" font-size="8" font-family="JetBrains Mono" fill="#fff" font-weight="bold">TS</text>
          <text x="200" y="555" font-size="10" font-family="JetBrains Mono" fill="#fff" font-weight="bold">TN</text>
          <text x="165" y="560" font-size="8" font-family="JetBrains Mono" fill="#fff" font-weight="bold">KL</text>
          <text x="165" y="145" font-size="8" font-family="JetBrains Mono" fill="#fff" font-weight="bold">PB</text>
          <text x="490" y="205" font-size="9" font-family="JetBrains Mono" fill="#fff" font-weight="bold">AS</text>
        </g>
      </svg>
    `;

    dom.indiaMapContainer.innerHTML = svgHtml;

    // Attach click & hover events to state paths
    dom.indiaMapContainer.querySelectorAll(".state-path").forEach(path => {
      path.addEventListener("click", () => {
        const id = path.getAttribute("data-id");
        selectState(id);
      });
      path.addEventListener("mouseenter", () => {
        const id = path.getAttribute("data-id");
        const st = STATE_DATABASE[id];
        if (st) {
          dom.mapHoverInfo.textContent = `📍 ${st.name} — ${st.zone} | Water: ${st.waterHardness} | CSI: ${st.csi}`;
        }
      });
      path.addEventListener("mouseleave", () => {
        const activeSt = STATE_DATABASE[currentStateId];
        dom.mapHoverInfo.textContent = `Active State: ${activeSt.name} — ${activeSt.zone} | Water: ${activeSt.waterHardness}`;
      });
    });
  }

  // Load State Diagnostics into Simulator & Control Plan
  function selectState(stateId) {
    if (!STATE_DATABASE[stateId]) return;
    currentStateId = stateId;
    const st = STATE_DATABASE[stateId];

    // Update Dropdown & Map Highlights
    dom.stateSelectDropdown.value = stateId;
    dom.indiaMapContainer.querySelectorAll(".state-path").forEach(p => p.classList.remove("selected"));
    const activePath = document.getElementById(`state-path-${stateId}`);
    if (activePath) activePath.classList.add("selected");

    // Update Banner KPIs
    dom.kpiCurrentStateName.textContent = `${st.name} — ${st.zone.split("&")[0]}`;
    dom.kpiCurrentRisk.textContent = `${st.csi > 0.8 ? "Severe" : st.csi > 0.75 ? "High" : "Moderate"} (CSI ${st.csi})`;
    dom.selectedStateHeaderTitle.textContent = `${st.name} (${st.zone})`;

    // Sync Baseline Parameters into Simulator
    dom.pHInput.value = st.baseline.ph;
    dom.pHVal.textContent = st.baseline.ph.toFixed(1);
    dom.doInput.value = st.baseline.do;
    dom.doVal.textContent = `${st.baseline.do} ppb`;
    dom.tdsInput.value = st.baseline.tds;
    dom.tdsVal.textContent = `${st.baseline.tds} ppm`;
    dom.pressureInput.value = st.baseline.pressure;
    dom.pressureVal.textContent = `${st.baseline.pressure} bar`;
    dom.sulfurInput.value = st.baseline.sulfur.toFixed(1);
    dom.sulfurVal.textContent = `${st.baseline.sulfur.toFixed(1)} %`;
    dom.flueTempInput.value = st.baseline.flueTemp;
    dom.flueTempVal.textContent = `${st.baseline.flueTemp} °C`;
    dom.exposureTypeSelect.value = st.exposureType;

    // Render State Profile & Control Plan
    renderStateProfile(st);

    // Run Predictive Simulation
    runSimulation();

    // Highlight row in matrix table
    highlightTableRow(stateId);
  }

  // Render State Profile Info Cards & 5-Tier Plan
  function renderStateProfile(st) {
    // Clusters List
    dom.stateClustersList.innerHTML = st.clusters.map(c => `<span class="tag-item">${c}</span>`).join("");

    // Environment & Water Specs
    dom.stateEnvSpecs.innerHTML = `
      <div class="env-row"><span>Raw Water Source:</span><span>${st.waterSource}</span></div>
      <div class="env-row"><span>Hardness & Chlorides:</span><span>${st.waterHardness}</span></div>
      <div class="env-row"><span>Atmosphere Category:</span><span style="text-transform:capitalize;">${st.exposureType.replace("_", " ")}</span></div>
      <div class="env-row"><span>Corrosion Severity Index:</span><span>${st.csi} / 1.0</span></div>
    `;

    // Fuels List
    dom.stateFuelsList.innerHTML = st.fuels.map(f => `<span class="tag-item">${f}</span>`).join("");

    // Key Vulnerabilities
    dom.stateVulnerabilitiesList.innerHTML = st.vulnerabilities.map(v => `<div class="vuln-item">${v}</div>`).join("");

    // 5-Tier Control Plan Steps
    let planHtml = "";
    st.controlPlan.forEach((step, idx) => {
      planHtml += `
        <div class="step-card">
          <div class="step-badge">${idx + 1}</div>
          <div class="step-content">
            <div class="step-title">${step.title}</div>
            <div class="step-desc">${step.desc}</div>
            <div class="step-params">
              ${step.params.map(p => `<span class="param-pill">${p}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
    });
    dom.controlPlanStepsContainer.innerHTML = planHtml;
  }

  // Execute Live Simulation Calculation
  function runSimulation() {
    const params = {
      ph: parseFloat(dom.pHInput.value),
      doPpb: parseFloat(dom.doInput.value),
      tdsPpm: parseFloat(dom.tdsInput.value),
      pressureBar: parseFloat(dom.pressureInput.value),
      sulfurPct: parseFloat(dom.sulfurInput.value),
      flueTempC: parseFloat(dom.flueTempInput.value),
      exposure: dom.exposureTypeSelect.value
    };

    const results = calculateCorrosionEngine(params);

    // Update Display Metrics
    dom.predictedRateDisplay.textContent = results.rateMpy.toFixed(2);
    dom.predictedRateMetric.textContent = `(${results.rateMmYr.toFixed(3)} mm/yr)`;
    dom.severityBadge.textContent = results.severity;
    dom.severityBadge.className = `severity-badge ${results.badgeClass}`;

    dom.tubeLifeDisplay.textContent = `${results.estimatedLifeYears.toFixed(1)} Years`;
    dom.acidDewPointDisplay.textContent = `${results.acidDewPointC.toFixed(1)} °C`;

    // Update Factor Bars
    dom.pctDO.textContent = `${results.weights.pctDO}%`;
    dom.barDO.style.width = `${results.weights.pctDO}%`;
    dom.pctTDS.textContent = `${results.weights.pctTDS}%`;
    dom.barTDS.style.width = `${results.weights.pctTDS}%`;
    dom.pctAcid.textContent = `${results.weights.pctAcid}%`;
    dom.barAcid.style.width = `${results.weights.pctAcid}%`;
    dom.pctPH.textContent = `${results.weights.pctPH}%`;
    dom.barPH.style.width = `${results.weights.pctPH}%`;
    dom.pctStress.textContent = `${results.weights.pctStress}%`;
    dom.barStress.style.width = `${results.weights.pctStress}%`;

    // Update Hazard Alert Box
    dom.alertTitle.textContent = results.alert.title;
    dom.alertDesc.textContent = results.alert.desc;
  }

  // Render Component Tab Detail
  function selectComponent(compId) {
    if (!BOILER_COMPONENTS[compId]) return;
    currentComponentId = compId;
    const comp = BOILER_COMPONENTS[compId];

    dom.componentTabs.querySelectorAll(".comp-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-comp") === compId);
    });

    dom.componentDetailCard.innerHTML = `
      <div class="comp-header">
        <div>
          <div class="comp-title">${comp.name}</div>
          <span style="font-size:0.75rem; color:var(--text-muted);">Location: ${comp.location}</span>
        </div>
        <span class="comp-temp-tag">${comp.tempRange}</span>
      </div>

      <div class="comp-desc">${comp.description}</div>

      <div class="comp-specs-grid">
        <div class="spec-box">
          <div class="spec-title">Failure Mechanisms</div>
          <div class="spec-value" style="color:#f87171;">${comp.mechanisms}</div>
        </div>
        <div class="spec-box">
          <div class="spec-title">Vulnerable Baseline Alloys</div>
          <div class="spec-value">${comp.vulnerableAlloys}</div>
        </div>
        <div class="spec-box">
          <div class="spec-title">Recommended Metallurgy</div>
          <div class="spec-value" style="color:var(--color-cyan);">${comp.upgradeAlloys}</div>
        </div>
      </div>

      <div class="comp-mitigation-box">
        <h4>Targeted Engineering Mitigation &amp; Operation Protocols</h4>
        <p>${comp.mitigation}</p>
      </div>
    `;
  }

  // Populate Master State Matrix Table
  function renderMatrixTable(filterText = "") {
    const tbody = dom.statesTableBody;
    tbody.innerHTML = "";

    const query = filterText.toLowerCase();

    Object.keys(STATE_DATABASE).forEach(id => {
      const st = STATE_DATABASE[id];
      if (activeFilter !== "all" && st.category !== activeFilter) return;

      const fullText = `${st.name} ${st.zone} ${st.clusters.join(" ")} ${st.fuels.join(" ")} ${st.vulnerabilities.join(" ")}`.toLowerCase();
      if (query && !fullText.includes(query)) return;

      let badgeColor = "var(--status-low)";
      if (st.csi > 0.82) badgeColor = "var(--status-severe)";
      else if (st.csi > 0.75) badgeColor = "var(--status-high)";
      else if (st.csi > 0.70) badgeColor = "var(--status-mod)";

      const tr = document.createElement("tr");
      tr.id = `row-${id}`;
      tr.className = id === currentStateId ? "active-row" : "";
      tr.innerHTML = `
        <td><strong>${st.name}</strong></td>
        <td>${st.zone.split("&")[0]}</td>
        <td>${st.clusters[0].split("(")[0]}</td>
        <td>${st.waterSource.split("/")[0]}</td>
        <td><span style="font-family:var(--font-mono);font-size:0.75rem;">${st.waterHardness.split(",")[0]}</span></td>
        <td><span style="color:#f87171;font-size:0.75rem;">${st.vulnerabilities[0].split("in")[0]}</span></td>
        <td><strong style="color:${badgeColor};font-family:var(--font-mono);">${st.csi.toFixed(2)}</strong></td>
        <td><button class="btn btn-sm btn-outline view-btn" data-id="${id}">Inspect</button></td>
      `;

      tr.addEventListener("click", () => selectState(id));
      tbody.appendChild(tr);
    });
  }

  function highlightTableRow(stateId) {
    dom.statesTableBody.querySelectorAll("tr").forEach(tr => tr.classList.remove("active-row"));
    const activeRow = document.getElementById(`row-${stateId}`);
    if (activeRow) activeRow.classList.add("active-row");
  }

  // Export Matrix Table to CSV
  function exportTableToCsv() {
    const rows = [
      ["State", "Geographic Zone", "Industrial Clusters", "Primary Fuel", "Water Source", "Water Hardness", "Exposure Category", "CSI Rating"]
    ];

    Object.keys(STATE_DATABASE).forEach(id => {
      const st = STATE_DATABASE[id];
      rows.push([
        `"${st.name}"`,
        `"${st.zone}"`,
        `"${st.clusters.join("; ")}"`,
        `"${st.fuels.join("; ")}"`,
        `"${st.waterSource}"`,
        `"${st.waterHardness}"`,
        `"${st.exposureType}"`,
        st.csi
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `India_Boiler_Corrosion_State_Matrix_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Open Audit Sheet Dossier Modal
  function openAuditModal() {
    const st = STATE_DATABASE[currentStateId];
    dom.auditModalSubtitle.textContent = `Official Diagnostic Dossier — ${st.name} (${st.zone})`;

    const params = {
      ph: parseFloat(dom.pHInput.value),
      doPpb: parseFloat(dom.doInput.value),
      tdsPpm: parseFloat(dom.tdsInput.value),
      pressureBar: parseFloat(dom.pressureInput.value),
      sulfurPct: parseFloat(dom.sulfurInput.value),
      flueTempC: parseFloat(dom.flueTempInput.value),
      exposure: dom.exposureTypeSelect.value
    };
    const sim = calculateCorrosionEngine(params);

    let html = `
      <div style="border-bottom: 2px solid var(--border-medium); padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="font-family:var(--font-heading); font-size:1.3rem; color:#fff;">CENTRAL BOILERS BOARD &amp; IBR STATUTORY AUDIT DOSSIER</h2>
        <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-cyan);">DOCUMENT NO: IBR-CORR-IN-${st.name.toUpperCase().slice(0,3)}-${new Date().getFullYear()}</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
        <div class="spec-box">
          <div class="spec-title">Target Factory Location</div>
          <div class="spec-value">${st.name} — ${st.zone}</div>
          <div style="font-size:0.74rem; color:var(--text-muted); margin-top:3px;">Clusters: ${st.clusters.join(", ")}</div>
        </div>
        <div class="spec-box">
          <div class="spec-title">Simulated Corrosion Rate &amp; Lifespan</div>
          <div class="spec-value" style="color:#f87171;">${sim.rateMpy.toFixed(2)} mpy (${sim.rateMmYr.toFixed(3)} mm/yr)</div>
          <div style="font-size:0.74rem; color:var(--text-muted); margin-top:3px;">Estimated Tube RUL: <strong>${sim.estimatedLifeYears.toFixed(1)} Years</strong> | CSI: ${st.csi}</div>
        </div>
      </div>

      <h3 style="font-size:0.95rem; color:var(--color-cyan); margin-bottom:8px;">1. Operational &amp; Environmental Exposure Baseline</h3>
      <table class="data-table" style="margin-bottom:16px;">
        <tr><td>Feedwater pH</td><td><strong>${params.ph}</strong> (Target: 9.2 - 9.6)</td><td>Dissolved Oxygen</td><td><strong>${params.doPpb} ppb</strong> (Limit: < 5 ppb)</td></tr>
        <tr><td>Boiler Water TDS</td><td><strong>${params.tdsPpm} ppm</strong></td><td>Operating Pressure</td><td><strong>${params.pressureBar} bar</strong></td></tr>
        <tr><td>Fuel Sulfur Content</td><td><strong>${params.sulfurPct}% S</strong></td><td>Flue Gas Exit Temp</td><td><strong>${params.flueTempC} °C</strong> (T_adp = ${sim.acidDewPointC.toFixed(1)}°C)</td></tr>
      </table>

      <h3 style="font-size:0.95rem; color:var(--color-cyan); margin-bottom:8px;">2. Active Corrosion Hazard Assessment</h3>
      <div class="comp-mitigation-box" style="margin-bottom:16px;">
        <strong>${sim.alert.title}</strong>
        <p>${sim.alert.desc}</p>
      </div>

      <h3 style="font-size:0.95rem; color:var(--color-cyan); margin-bottom:8px;">3. Mandatory 5-Tier State Mitigation Protocol</h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${st.controlPlan.map((step, i) => `
          <div style="background:var(--bg-surface-elevated); padding:8px 12px; border-radius:4px; border-left:3px solid var(--color-accent);">
            <strong style="color:#fff; font-size:0.82rem;">${i+1}. ${step.title}</strong>
            <p style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">${step.desc}</p>
            <div style="margin-top:4px; font-family:var(--font-mono); font-size:0.68rem; color:var(--color-cyan);">${step.params.join(" | ")}</div>
          </div>
        `).join("")}
      </div>
    `;

    dom.auditModalBody.innerHTML = html;
    dom.auditModal.classList.add("active");
  }

  function closeAuditModal() {
    dom.auditModal.classList.remove("active");
  }

  // =========================================================================
  // 5. EVENT LISTENERS INITIALIZATION
  // =========================================================================
  function initEventListeners() {
    // Dropdown change
    dom.stateSelectDropdown.addEventListener("change", (e) => selectState(e.target.value));

    // Region Filter Pills
    dom.regionFilters.addEventListener("click", (e) => {
      const pill = e.target.closest(".pill");
      if (!pill) return;
      dom.regionFilters.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeFilter = pill.getAttribute("data-filter");
      renderMatrixTable(dom.tableSearchInput.value);
    });

    // Slider inputs -> live calculation
    const sliders = [
      { el: dom.pHInput, val: dom.pHVal, suffix: "", decimals: 1 },
      { el: dom.doInput, val: dom.doVal, suffix: " ppb", decimals: 0 },
      { el: dom.tdsInput, val: dom.tdsVal, suffix: " ppm", decimals: 0 },
      { el: dom.pressureInput, val: dom.pressureVal, suffix: " bar", decimals: 0 },
      { el: dom.sulfurInput, val: dom.sulfurVal, suffix: " %", decimals: 1 },
      { el: dom.flueTempInput, val: dom.flueTempVal, suffix: " °C", decimals: 0 }
    ];

    sliders.forEach(s => {
      s.el.addEventListener("input", () => {
        s.val.textContent = parseFloat(s.el.value).toFixed(s.decimals) + s.suffix;
        runSimulation();
      });
    });

    dom.exposureTypeSelect.addEventListener("change", runSimulation);

    // Reset Simulation button
    dom.resetSimBtn.addEventListener("click", () => selectState(currentStateId));

    // Component Tabs click
    dom.componentTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".comp-btn");
      if (!btn) return;
      const compId = btn.getAttribute("data-comp");
      selectComponent(compId);
    });

    // Matrix Table Search
    dom.tableSearchInput.addEventListener("input", (e) => {
      renderMatrixTable(e.target.value);
    });

    // Export CSV
    dom.exportCsvBtn.addEventListener("click", exportTableToCsv);

    // Audit Modal Triggers
    dom.quickAuditBtn.addEventListener("click", openAuditModal);
    dom.closeModalBtn.addEventListener("click", closeAuditModal);
    dom.closeModalBtn2.addEventListener("click", closeAuditModal);
    dom.printAuditBtn.addEventListener("click", () => window.print());

    dom.auditModal.addEventListener("click", (e) => {
      if (e.target === dom.auditModal) closeAuditModal();
    });
  }

  // =========================================================================
  // 6. BOOTSTRAP INITIALIZATION
  // =========================================================================
  function init() {
    populateStateDropdown();
    renderIndiaMap();
    selectState(currentStateId);
    selectComponent(currentComponentId);
    renderMatrixTable();
    initEventListeners();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
