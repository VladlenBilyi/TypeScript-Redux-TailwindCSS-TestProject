import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import { UserInfo } from "../types/userInfo";

import { register } from '../../redux/actions/authAction'
import { RootStore } from '../../utils/TypeScript';
import { useTypedDispatch, useTypedSelector } from '../../redux/store';


const Register = () => {
  const { auth } = useTypedSelector((state: RootStore) => state)
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password2: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required(t("common.validations.required")),
      name: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .min(5, t("common.validations.min", { size: 5 }))
        .required(t("common.validations.required")),
      password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required(t("common.validations.required")),
      password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (values: Partial<UserInfo>) => {
    try {
      dispatch(register(values as UserInfo))
      snackbar.success(t("auth.register.notifications.success"));
      navigate(`/${process.env.PUBLIC_URL}/login`)
    } catch (err) {
      snackbar.error(t("common.errors.unexpected.subTitle"));
    }
  };

  return (
    <BoxedLayout>
      <Typography component="h1" variant="h5">
        {t("auth.register.title")}
      </Typography>
      <Box
        component="form"
        marginTop={3}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label={'FullName'}
          name="name"
          autoComplete="family-name"
          autoFocus
          disabled={auth.loading}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={'E-mail Address'}
          name="email"
          autoComplete="email"
          disabled={auth.loading}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label={'Password'}
          name="password"
          type="password"
          autoComplete="password"
          disabled={auth.loading}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password2"
          label={'Confirm Password'}
          name="password2"
          autoComplete="password"
          type="password"
          disabled={auth.loading}
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={auth.loading}
          sx={{ mt: 2 }}
        >
          {t("auth.register.submit")}
        </LoadingButton>
        <Button
          component={Link}
          to={`/${process.env.PUBLIC_URL}/login`}
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t("auth.register.back")}
        </Button>
      </Box>
    </BoxedLayout>
  );
};

export default Register;
