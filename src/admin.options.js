const AdminJS = require("adminjs");
const argon2 = require("argon2");
const hashPassword = require("@adminjs/passwords");

// postgres
const Users = require("./models/user.entity");
const Logs = require("./models/log.entity");
// mongodb
require("./config/mongo.connection");
const Blog = require("./models/blog.entity");
const Companies = require("./models/company.entity");
const Cms = require("./models/cms.entity");

const companiesBeforeNew = async (request) => {
  if (request.payload.password) {
    console.log("new password".request.payload.password);
    request.payload = {
      ...request.payload,
      encryptedPassword: await argon2.hash(request.payload.password, 10),
      password: undefined,
    };
  }
  return request;

  // if (request.method === 'post') {
  // 	const { password, ...otherParams } = request.payload;
  // 	if (password) {
  // 		const encryptedPassword = await argon2.hash(password);
  // 		return {
  // 			...request,
  // 			payload: {
  // 				...otherParams,
  // 				encryptedPassword,
  // 			},
  // 		};
  // 	}
  // }
};

const companiesBeforeEdit = async (request) => {
  if (request.payload.password) {
    console.log("edit password".request.payload.password);
    request.payload = {
      ...request.payload,
      encryptedPassword: await argon2.hash(request.payload.password, 10),
      password: undefined,
    };
  }
  return request;
};

const options = {
  resources: [
    {
      resource: Cms,
      options: {
        dashboard: {
          component: AdminJS.bundle("./components/my-dashboard-component"),
        },
        listProperties: ["title", "content", "amount"],

        properties: {
          content: {
            type: "textarea",
            isSortable: false,
          },
          amount: {
            type: "currency",
            props: {
              decimalSeparator: ".",
              decimalScale: 2,
              groupSeparator: " ",
              intlConfig: { locale: "pl-PL", currency: "PLN" },
            },
          },
        },

        // content: {
        // 	type: 'richtext',
        // 	custom: {
        // 		modules: {
        // 			toolbar: [
        // 				['bold', 'italic'],
        // 				['link', 'image'],
        // 			],
        // 		},
        // 	},
        // },

        actions: {
          // show: {
          // 	// change the behavior of show action
          // },
          myResourceAction: {
            // handler of a bulkAction should return an Array of RecordJSON object
            actionType: "resource",
            handler: (request, response, context) => {
              console.log(request);
              // console.log('record', context.record);
              // const cms = context.record;
              // return {
              // 	record: cms.toJSON(context.currentAdmin),
              // };
            },
            component: AdminJS.bundle(
              "./components/my-resource-action-component"
            ),
          },
          myBulkAction: {
            // handler of a bulkAction should return an Array of RecordJSON object
            actionType: "bulk",
            handler: (request, response, context) => {
              console.log(request);
              // console.log('record', context.record);
              // const cms = context.record;
              // return {
              // 	record: cms.toJSON(context.currentAdmin),
              // };
            },
            // component: AdminJS.bundle('./components//my-action-component'),
          },
          playTheGame: {
            icon: "View",
            actionType: "record",
            handler: (request, response, context) => {
              console.log("record", context.record);
              const cms = context.record;
              return {
                record: cms.toJSON(context.currentAdmin),
              };
            },
            component: AdminJS.bundle("./components//my-action-component"),
          },
        },
      },
    },
    {
      resource: Logs,
      options: {
        listProperties: ["userId", "logDate", "details"],
        properties: {
          id: {
            show: true,
            edit: false,
            filter: false,
          },
          userId: {
            show: true,
            edit: true,
            filter: true,
          },
          logDate: {
            show: true,
            edit: true,
            filter: true,
          },
          details: {
            show: true,
            edit: true,
            filter: false,
          },
          createdAt: {
            show: true,
            edit: false,
            filter: false,
          },
          updatedAt: {
            show: true,
            edit: false,
            filter: false,
          },
        },
      },
    },
    {
      resource: Users,
      options: {
        // listProperties: ['id', 'name', 'surname', 'phone', 'updatedAt'],
        properties: {
          id: {
            isVisible: {
              list: true,
              edit: false,
              filter: false,
              show: true,
            },
          },
          name: {
            isVisible: {
              list: true,
              edit: true,
              filter: false,
              show: true,
            },
          },
          surname: {
            isVisible: {
              list: true,
              edit: true,
              filter: false,
              show: true,
            },
          },
          phone: {
            isVisible: {
              list: true,
              edit: true,
              filter: false,
              show: true,
            },
          },
          createdAt: {
            isVisible: {
              list: false,
              edit: false,
              filter: false,
              show: true,
            },
          },
          updatedAt: {
            isVisible: {
              list: false,
              edit: false,
              filter: false,
              show: true,
            },
          },
        },
      },
    },
    {
      resource: Companies,
      options: {
        listProperties: [
          "companyName",
          "address",
          "email",
          "encryptedPassword",
        ],
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          // password: {
          // 	type: 'password',
          // },
        },
        actions: {
          // new: {
          // 	before: companiesBeforeNew,
          // },
          // edit: {
          // 	before: companiesBeforeEdit,
          // },
        },
      },
      features: [
        hashPassword({
          properties: {
            encryptedPassword: "encryptedPassword",
            password: "password",
          },
          hash: argon2.hash,
        }),
      ],
    },
    {
      resource: Blog,

      options: {
        listProperties: ["title", "author", "body"],
        properties: {
          body: {
            type: "richtext",
            isSortable: false,
            custom: {
              maxLength: 30,
            },
          },
        },
      },
    },
  ],

  rootPath: "/admin",
  branding: {
    companyName: "RST Ltd",
  },

  locale: {
    language: "pl",
    translations: {
      messages: {
        welcomeOnBoard_title: "Witaj AdminJS",
      },
    },
    availableLanguages: ["pl", "en", "ua"],
  },
};

module.exports = options;
