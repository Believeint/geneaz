/// <reference path="familytree.d.ts" />
// Conexao com Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase, ref, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { firebaseConfig } from "../../../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const dbRef = ref(db);

var dataGeneaz = [];

FamilyTree.SEARCH_PLACEHOLDER = 'Pesquisar';
FamilyTree.templates.john.img_0 = '';
FamilyTree.RES.IT_IS_LONELY_HERE_LINK = 'Carregando...';
//FamilyTree.match.boundary = 1;
//FamilyTree.match.height = 1;
//FamilyTree.match.width = 1;
//FamilyTree.orientation.top = 1;

var data = [

    { id: 1, pids: [2], name: "Maria", fullName: "Maria Filgueira de Carvalho", gender: "female", dob: "1928-02-16" },
    { id: 2, pids: [1], name: "Cirilo", fullName: "Cirilo Rofrigues de Souza", gender: "male", dob: "1935-01-20" },
    { id: 3, pids: [4], name: "Rosalina", fullName: "Rosalina Vitorina dos Santos", gender: "female", dob: "1927-01-27" },
    { id: 4, pids: [3], name: "Pedro Alcantara", fullName: "Pedro Alcantara dos Santos", gender: "male", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t1.18169-9/21077795_1819194595033070_5921570424373292097_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeH6JSKy3LVlRjNCNsJ54Th3lSqEbXAQv_CVKoRtcBC_8L3cs3vDYfNm5vOMCn2NaGzVcj_a2Qa_5A6u7OxNxaAA&_nc_ohc=e9b63-6reJQAX_UyYg-&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT8-imraMwJ6A_6UjSYQA-c3u82Fe964eUCWbdE56C8_dw&oe=634493D1" },
    { id: 5, pids: [6], mid: 1, fid: 2, name: "Tania", fullName: "Tania Maria Carvalho Souza", gender: "female", dob: "1965-10-31", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t1.6435-9/156626742_1664746247067446_7589426849399954369_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGcFtVJsxwC5gvc1eR1HKS7MMbGJghPsyEwxsYmCE-zIYZSJq1fj043ZO-cTyzjC8ICkLvuIkCQRydfE2I9PDdk&_nc_ohc=PcraODeQQ3QAX-8OZbq&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT9W84QQ7KXmliSsWkMPjMNv08GaKGlyjNhzWVYrJfUodw&oe=63422624" },
    { id: 6, pids: [5], mid: 3, fid: 4, name: "Claudionor", fullName: "Claudionor Alcantara dos Santos", gender: "male", dob: "1955-08-22", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t1.6435-9/99290234_2787447424711403_5516121361195466752_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGlZMZMvryL7w9HQEaGsxh9kAegzOCM4ueQB6DM4Izi53lc0T7zaOZMBhIi-MueQktD58J9RrXCoz8SxpHglUku&_nc_ohc=PMmwKEqlIooAX-mJuaA&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT8MXBEZ138Jw0PfDqmOZMuTHDLj9TPoWiDnEpMmeSB_OA&oe=6342C3A9" },
    { id: 7, mid: 5, fid: 6, name: "Katia", fullName: "Katia Carvalho dos Santos", gender: "female", dob: "1993-06-24", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t39.30808-6/281472903_4862727393850052_4617397277112384084_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHdbZCgJ07VuDxOcOdWV-pSIQsRp_ml6cchCxGn-aXpx0ke_peuqVYGdiDDDyf5xlUcQJLJOUoTRVDDCJfQzoiX&_nc_ohc=GQuS5CBqdTcAX_3gouF&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT9HXok8Sw9rtasfBp1NfmZ_VQDTK5itVh0757HDj3II4w&oe=632350E7" },
    { id: 8, mid: 5, fid: 6, name: "Elias", fullName: "Elias Carvalho dos Santos", gender: "male", dob: "1996-06-30", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t39.30808-6/246475595_4447272505388868_7068237518027055519_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHj7-e2hyT3nBsPDLmZMzRnaCNsYLnHDgNoI2xguccOA1Xa3Ml3zpYpRPC9fx-2YRaDosbh5DbjPAF1bZN92T3l&_nc_ohc=qzygUfrNVBQAX-heqa7&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT-IrztCWMpb5HprZtCp8n01FdgWXfDsU1h_0Q6oqVI_QQ&oe=63225EDB" }, 
    { id: 9, mid: 5, fid: 6, name: "Pedro", fullName: "Pedro Henrique Carvalho dos Santos", gender: "male", dob: "1998-11-14", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t39.30808-6/296275241_580709160259885_8592377385201344011_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_eui2=AeG25TChKzjJudLEJmWT4ZNSr1zapd8u7C2vXNql3y7sLebn7NJ9wbnKj_6zivGeHhIyeV6Ggeb42zuJBTyM9q0W&_nc_ohc=2IVJRrGWBeIAX-v0U3U&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT98k-pMipCmUE7kxhFSe-jv_qrmxbNq4IlMd16D0es2VA&oe=6322AB21" }, 
    { id: 10, mid: 5, fid: 6, name: "Davi", fullName: "Davi Carvalho dos Santos", gender: "male", dob: "2000-11-15", urlImg: "https://scontent.fgyn11-1.fna.fbcdn.net/v/t31.18172-8/13323541_929618710500203_6636405263440424376_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_eui2=AeEykLtOzH-vQx65rnrK1UBLmsGeq0IqkhCawZ6rQiqSEP4mbvCNQnnF6BVbIRWSrh_0siPB3wgaRZ1RBsew8K1T&_nc_ohc=tFVk9KG-PWIAX9woiqP&_nc_ht=scontent.fgyn11-1.fna&oh=00_AT_FCnF0aMbhrt_1ikRgwv5C-g8NcfFGONnh1XUlun3c5A&oe=63443234" }, 
];

var family = new FamilyTree(document.getElementById("tree"), {
    //miniMap: true,
    //padding: 20,
    //mouseScrool: FamilyTree.none,
    levelSeparation: 50,
    siblingSeparation: 50,
    subtreeSeparation: 50,
    //mouseScrool: FamilyTree.action.none,
    template: 'tommy',
    mode: 'light',
    // state: {
    //     name: 'StateForGeneAZ',
    //     readFromLocalStorage: false,
    //     writeToLocalStorage: false,
    //     readFromIndexedDB: true,
    //     writeToIndexedDB: true,
    //     readFromUrlParams: false,
    //     writeToUrlParams: false
    // },
    //searchFields: ["name"],
    //filterBy: ['gender'],
    menu: {
        pdf: { text: 'Exportar PDF' },
        png: { text: "Exportar PNG" },
        svg: { text: "Exportar SVG" },
        json: { text: "Exportar JSON" },
        importJSON: {
            text: 'Importar JSON',
            icon: FamilyTree.icon.json(24, 24, '#00ff00'),
            onClick: function() { family.importJSON(); }
        }
    },
    nodeBinding: {
        field_0: "name",
        field_1: "dob",
        img_0: "urlImg"
    },
    // nodeMenu: {
    //     details: {text: "Detalhes"},
    //     edit: { text: "Editar" }
    // },
    //nodes: data,
    tags: {
        filter: {
            template: 'dot'
        }
    },
    nodeTreeMenu: true,
    // nodeMenu: {
    //     call: {
    //         icon: FamilyTree.icon.edit(24,24,'#fff'),
    //         text: "Call now",
    //         onClick: callHandler
    //     }
    // },
    // clinks: [
    //     { from: 3, to: 1, label: 'Filho', template: 'blue' }
    // ],
    nodeMouseClick: FamilyTree.action.details,
    //editForm: {readOnly: true}
    editForm: {
        addMore: 'Adicionar +',
        addMoreFieldName: "Nome do Campo",
        cancelBtn: "Cancelar",
        saveAndCloseBtn: "Salvar",
        generateElementsFromFields: false,
        photoBinding: "urlImg",
        elements: [
            {type: 'textbox', label: "Nome", binding: 'name'},
            {type: 'textbox', label: "Nome Completo", binding: 'fullName'},
            {type: 'select', options:[
                {value: 'male', text: "Masculino"},
                {value: 'female', text: "Feminino"},
            ], label: "Gênero", binding: 'gender'},
            {type: 'date', label: "Data Nascimento", binding: 'dob'},
            {type: 'textbox', label: "Url Imagem", binding: 'urlImg'}
        ],
        buttons: {
            edit: {
                icon: FamilyTree.icon.edit(24,24,'#fff'),
                text: 'Editar',
                hideIfEditMode: true,
                hideIfDetailsMode: false
            },
            share: {
                icon: FamilyTree.icon.share(24,24,'#fff'),
                text: 'Compartilhar'
            },
            // pdf: {
            //     icon: FamilyTree.icon.pdf(24,24,'#fff'),
            //     text: 'Salvar como PDF'
            // },
            pdf: null,
            remove: {
                icon: FamilyTree.icon.remove(24,24,'#fff'),
                text: 'Remover'
            }
        }
    }
});

get(child(dbRef, 'geneazData')).then(async (snapshot) => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
        //console.log(user)
        //family.load(data)
        if(user) {
            if(snapshot.exists()) {
                dataGeneaz = JSON.parse(snapshot.val());
                family.load(dataGeneaz);
            } else {
                console.log("Sem dados disponíveis");
                family.load(data);
            }
        } else {
            FamilyTree.RES.IT_IS_LONELY_HERE_LINK = 'Sem acesso...';
            console.log('Sem acesso ao sistema');
        }
    });
    
}).catch((error) => {
    console.log(error);
});


/// ADD DIVISOR DIVORCIO
// family.on('render-link', function(sender, args) {
//     var cnodeData = family.get(args.cnode.id);
//     var nodeData = family.get(args.node.id);

//     if (cnodeData.divorced != undefined && nodeData.divorced != undefined &&
//         cnodeData.divorced.includes(args.node.id) && nodeData.divorced.includes(args.cnode.id)) {
//           console.log(args.html);
//           args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
//       }
// });

// // ADD LINK PARA UM CAMPO
// family.on('field', function(sender, args) {
//     var name = args.data['fn'];
//     if(args.data['link']) {
//         var link = args.data['link'];
//         args.value = '<a target="_blank" href="' + link + '">' + name +  '</a>';
//     }

// });

// family.on('field', function(sender, args) {
//     var name = args.data['dob'];
//     if(args.data['dob']) {
//         let dtUs = args.data['dob'];
//         let dtBr = dtUs.split('-').reverse().join('/');
//         console.log(sender);
//     }

// });


family.on('import', (e, dados) => {
    let dataRef = child(dbRef ,'geneazData', null);
    remove(dataRef);

    dataGeneaz = dados;
})

family.on('updated', (e)=> {
    let dataRef = child(dbRef ,'geneazData', null);
    remove(dataRef);

    var updates = {};    
    updates['geneazData'] = JSON.stringify(e.config.nodes);
    return update(dbRef, updates);
});


// const panel = document.getElementById("treePanel");

// var btn = document.createElement('button');
// btn.innerText = 'Pesq';
// btn.addEventListener('click', ()=> {
//     // var parent = [];
//     // parent['id'] = 12;
//     // parent['fn'] = "Maria";
//     // parent['name'] = "Maria Filgueira Carvalho";
//     // parent['gender'] = "female";

//     // family.addParentNode(1, "mid", parent, (callback) => {
//     //     console.log(callback);
//     // });
// });
// panel.appendChild(btn);

// function callHandler(nodeId) {
//     alert(nodeId)
//     //var nodeData = chart.get(nodeId);
//     //var employeeName = nodeData["name"];
//     //window.open('https://webcall.me/' + employeeName, employeeName, 'width=340px, height=670px, top=50px, left=50px');
// }

//family.load(dataGeneaz);