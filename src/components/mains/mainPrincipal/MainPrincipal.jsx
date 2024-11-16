import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import mainProfessionnnelStyle from "./MainPrincipal.module.css"

export default function MainPrincipal() {

  const codeUser = useSelector(state => state.auth.codeUser);

  const navigate = useNavigate();

  function handleClickBtnModifierPresentation(){
    navigate('/updatePresentation');
  }

  function handleClickBtnModifierProjetPedagogique(){
    navigate('/updateProjetPedagogique');
  }

  function handleClickBtnModifierReglement(){
    navigate('/updateReglement');
  }

  return (
    <>
        <div className={mainProfessionnnelStyle.presentation_container}>
          <h2>Présentation de la crèche</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aliquid eveniet animi officia? Soluta animi, nam nobis illum cupiditate error distinctio maiores veritatis ipsam quod rerum perspiciatis autem itaque quis, unde aspernatur vero, delectus id fugiat esse. Ipsa minima magnam repellendus. Minima quibusdam tenetur nulla repudiandae! Illum nisi quas veritatis dolor hic ipsum voluptatibus vero eligendi error? Quae a quia quibusdam magni, consequatur minus fugit ipsum ab, cum recusandae nostrum ea illo quisquam alias voluptatibus ex maiores esse repellendus! In, et ipsum. Dignissimos soluta quidem beatae molestias, numquam et repudiandae! Illo consectetur soluta sed nulla maiores provident exercitationem animi non.</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierPresentation}>Modifier</button>
            </div>
            )}
        </div>
        <div className={mainProfessionnnelStyle.pedagogique_container}>
          <h2>Projet pédagogique de la crèche</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui pariatur sint itaque recusandae, explicabo officiis incidunt obcaecati ut necessitatibus illo laborum ab veniam accusantium libero reiciendis ducimus? Quia blanditiis dolores ipsa aut, temporibus doloribus repellendus natus nihil itaque rerum neque odit repudiandae veritatis ipsam maxime autem numquam commodi distinctio quisquam! Assumenda, porro nesciunt maxime aliquid molestiae inventore quam aut reiciendis molestias doloribus repellendus cum suscipit maiores consectetur harum sequi. Reprehenderit neque deleniti cum error facere voluptas molestiae repudiandae explicabo, aliquam pariatur consectetur, porro voluptates atque. Facere asperiores minus saepe enim tempore sapiente itaque deserunt aut maxime vel doloremque expedita sequi, quidem ipsam officia laboriosam quis hic, error, repudiandae voluptate delectus explicabo libero excepturi ea. Similique dolor nisi quo reprehenderit dolorum!</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierProjetPedagogique}>Modifier</button>
            </div>
            )}
        </div>
        <div className={mainProfessionnnelStyle.reglement_container}>
          <h2>Réglement intérieur</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ex ab reiciendis nobis officiis dolores quas, laborum vel! Ab, earum accusantium deserunt molestias quidem ratione soluta necessitatibus quas iusto, vel perferendis officiis ad? Aliquam aperiam nulla magnam repellendus dolores dicta ut libero velit maxime mollitia sequi pariatur, deleniti beatae eum dignissimos voluptate nobis accusamus deserunt omnis quas? Illum eveniet odit, provident quas facere officia soluta assumenda, quos ullam quis quia harum delectus? Quidem impedit ipsum molestias earum saepe, doloribus distinctio veniam odit. Obcaecati voluptatibus veritatis omnis nesciunt quae repellendus neque aspernatur a rerum voluptatum quasi cum ullam perferendis excepturi nostrum, deleniti porro asperiores. Et amet consectetur quod obcaecati, sint minima? Aliquam, at. Veritatis illum nisi quasi commodi porro sequi corporis doloremque nesciunt. Enim, voluptas! Accusamus aperiam reprehenderit ipsum dolorum tempore inventore rerum adipisci consequatur ad harum vel et sapiente culpa debitis possimus, aliquam maxime repellat, corporis, reiciendis iste nihil itaque assumenda quae autem? Facere libero reiciendis unde labore tempora ducimus pariatur quo sit, culpa, molestiae nihil magni totam eveniet! Optio veniam voluptates consectetur, placeat non exercitationem ratione eligendi sunt consequatur.</p>
          {((codeUser == "DR") || (codeUser == "DA")) && (
            <div className={mainProfessionnnelStyle.btnModifierContainer}>
              <button className={mainProfessionnnelStyle.btnModifier} onClick={handleClickBtnModifierReglement}>Modifier</button>
            </div>
            )}
        </div>
    </>
  )
}