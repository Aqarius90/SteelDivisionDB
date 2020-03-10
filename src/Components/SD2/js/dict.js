import reco from "../../../pics/SD2/spec/spec_reconnaissance.tgv.png";
import recoradio from "../../../pics/SD2/spec/spec_reco_radio.tgv.png";
import shtraf from "../../../pics/SD2/spec/spec_decourage.tgv.png";
import shock from "../../../pics/SD2/spec/spec_discipline.tgv.png";
import arty from "../../../pics/SD2/spec/spec_tir_indirect.tgv.png";
import artyradio from "../../../pics/SD2/spec/spec_indirect_radio.tgv.png";
import nplm from "../../../pics/SD2/spec/spec_flamme.tgv.png";
import fighter from "../../../pics/SD2/spec/spec_canon.tgv.png";
import bmb1 from "../../../pics/SD2/spec/spec_bombes_1.tgv.png";
import bmb2 from "../../../pics/SD2/spec/spec_bombes_2.tgv.png";
import bmb3 from "../../../pics/SD2/spec/spec_bombes_3.tgv.png";
import rck1 from "../../../pics/SD2/spec/spec_roquettes_1.tgv.png";
import rck2 from "../../../pics/SD2/spec/spec_roquettes_2.tgv.png";
import rck3 from "../../../pics/SD2/spec/spec_roquettes_3.tgv.png";
import cmd from "../../../pics/SD2/spec/spec_commandement.tgv.png";
import cmdradio from "../../../pics/SD2/spec/spec_cmdt_radio.tgv.png";
import combat from "../../../pics/SD2/spec/spec_super_commandement.tgv.png";
import at1 from "../../../pics/SD2/spec/spec_at_1.tgv.png";
import supply from "../../../pics/SD2/spec/spec_ravitaillement.tgv.png";
import offmap from "../../../pics/SD2/spec/spec_offmap.tgv.png";
import cluster1 from "../../../pics/SD2/spec/spec_cluster_1.tgv.png";
import cluster2 from "../../../pics/SD2/spec/spec_cluster_2.tgv.png";
import amph from "../../../pics/SD2/spec/spec_amphibie.tgv.png";
import shturm from "../../../pics/SD2/spec/spec_straffing.tgv.png";
import radio from "../../../pics/SD2/spec/spec_radio.tgv.png";
import suicide from "../../../pics/SD2/spec/spec_suicide.tgv.png";
import smoke from "../../../pics/SD2/spec/spec_fumigene.tgv.png";
import partisan from "../../../pics/SD2/spec/spec_commando.png";

import armor from "../../../pics/SD2/armor.tgv.png";
import meca from "../../../pics/SD2/meca.tgv.png";
import soldier from "../../../pics/SD2/soldier.tgv.png";

export var Spec = [
  { k: "Spec_reconnaissance_Unite", i: reco },
  { k: "Spec_reco_radio_Unite", i: recoradio },
  { k: "spec_decourage_Unite", i: shtraf },
  { k: "Spec_discipline_Unite", i: shock },
  { k: "Spec_tir_indirect_Unite", i: arty },
  { k: "Spec_indirect_radio_Unite", i: artyradio },
  { k: "Spec_flamme_Unite", i: nplm },
  { k: "Spec_flamme_Avion", i: nplm },
  { k: "Spec_bombes_1_Avion", i: bmb1 },
  { k: "Spec_bombes_2_Avion", i: bmb2 },
  { k: "Spec_bombes_3_Avion", i: bmb3 },
  { k: "Spec_roquettes_1_Avion", i: rck1 },
  { k: "Spec_roquettes_2_Avion", i: rck2 },
  { k: "Spec_roquettes_3_Avion", i: rck3 },
  { k: "Spec_commandement_Unite", i: cmd },
  { k: "Spec_cmdt_radio_Unite", i: cmdradio },
  { k: "Spec_super_commandement_Unite", i: combat },
  { k: "Spec_AT_1_Unite", i: at1 },
  { k: "Spec_AT_1_Avion", i: at1 },
  { k: "Spec_ravitaillement_Unite", i: supply },
  { k: "Spec_OffMap_Unite", i: offmap },
  { k: "Spec_cluster_1_Avion", i: cluster1 },
  { k: "Spec_cluster_2_Avion", i: cluster2 },
  { k: "Spec_amphibie_Unite", i: amph },
  { k: "Spec_Straffing_Avion", i: shturm },
  { k: "Spec_radio_Unite", i: radio },
  { k: "Spec_suicide_Unite", i: suicide },
  { k: "Spec_fumigene_Unite", i: smoke },
  { k: "Spec_fumigene_Avion", i: smoke },
  { k: "Spec_reconnaissance_Avion", i: reco },
  { k: "Spec_canon_Avion", i: fighter },
  { k: "Spec_commando_Unite", i: partisan }
];

export var DivType = [
  { k: "Texture_Division_Type_soldier", i: soldier },
  { k: "Texture_Division_Type_armor", i: armor },
  { k: "Texture_Division_Type_meca", i: meca }
];
