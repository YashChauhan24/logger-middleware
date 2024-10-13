import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/,
    },
    password: {
      type: String,
      required: true,
      set: (p) => bcrypt.hashSync(p, 10),
      select: false,
    },
    passwordTries: { type: Number, default: 0 },
    passwordBlockedTill: { type: Date },
    phoneCode: { type: Number, default: 91 },
    phone: { type: Number },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    otpTries: { type: Number, default: 0 },
    otpBlockedTill: { type: Date },

    isVerified: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    role: {
      type: [String],
      enum: [
        "OrganizationsView",
        "OrganizationsAdd",
        "OrganizationsEdit",
        "OrganizationsDelete",
        "BlocklistView",
        "BlocklistAdd",
        "BlocklistEdit",
        "BlocklistDelete",
        "APIView",
        "APIAdd",
        "APIEdit",
        "APIDelete",
        "UnblockView",
        "UnblockAdd",
        "UnblockEdit",
        "UnblockDelete",
        "API LogsView",
        "API LogsAdd",
        "API LogsEdit",
        "API LogsDelete",
        "DocumentationView",
        "DocumentationAdd",
        "DocumentationEdit",
        "DocumentationDelete",
        "PlansView",
        "PlansAdd",
        "PlansEdit",
        "PlansDelete",
        "UsersView",
        "UsersAdd",
        "UsersEdit",
        "UsersDelete",
      ],
    },
  },
  { timestamps: true }
);

const AdminUserModel = model("AdminUser", AdminUserSchema);
export default AdminUserModel;
