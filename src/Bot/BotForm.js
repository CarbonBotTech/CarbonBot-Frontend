import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from 'react-redux';
import { parseErrors } from './../helpers/parseErrors';
import { createBot, updateBot, findBotById, deleteBot } from './../helpers/manageBots';
import { getCategories } from './../helpers/manageCategories';
import { getPlatforms } from './../helpers/managePlatforms';
import { useSnackbar } from 'notistack';
import Error from './../components/Error';
import {Button,Typography,TextField,LinearProgress,MenuItem} from '@material-ui/core';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Uploader from './../components/Uploader';
import Poster from './../components/Poster';
import Avatar from './../components/Avatar';
import AutoComplete from './../components/forms/AutoComplete';
import Selector from './../components/forms/Selector';
import { patterns } from './../helpers/botValidationPatterns';

let platforms_snapshot = [];

const BotForm = ({history,mode,match}) => {

    // state
    const [submitting, setSubmitting] = useState(false);
    const [is_error_visible, setErrorVisibile] = useState(false);
    const [error, setUiError] = useState([]);
    const [loading, setLoading] = useState(mode === 'edit' ? true : false);
    const [platforms, setPlatforms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bot, setBot] = useState(null);
    const [inputs_appended, setInputAppended] = useState(false);

    // redux
    const app = useSelector(state => state.app);
    
    // misc hooks
    const { control, handleSubmit, errors, setValue, setError, watch, register } = useForm();
    const { fields, append, remove } = useFieldArray({
        name: "links",
        control
    });
    const { enqueueSnackbar } = useSnackbar();
    let selected_platforms = watch("platforms");

    // lifecycles
    useEffect(() => {
        handleGetPlatforms();
        handleGetCategories();
        if(mode === "edit") {
            handleFindBotById(match.params.id);
        }
    },[]);

    // lifecycles
    useEffect(() => {
        if(selected_platforms && platforms_snapshot.length < selected_platforms.length) {
            
            if(mode === 'edit' && !inputs_appended) {
                // append all the forms is one shot
                for(let i in selected_platforms) {
                    append({
                        name: selected_platforms[i]["name"],
                        service: selected_platforms[i]["slug"],
                        url: findUrl(selected_platforms[i]["slug"])
                    });
                }
                setInputAppended(true); // mark the task as done
            } else {
                append({
                    name: selected_platforms[platforms_snapshot.length]["name"],
                    service: selected_platforms[platforms_snapshot.length]["slug"],
                    url: ''
                });
            }
        }
        if(selected_platforms && platforms_snapshot.length > selected_platforms.length) {
            let difference = platforms_snapshot.filter(({ slug: id1 }) => !selected_platforms.some(({ slug: id2 }) => id2 === id1));
            let index;
            for(let i in difference) {
                index = platforms_snapshot.map(e => e.slug).indexOf(difference[i]["slug"]);
                remove(index);
            }
        }
        platforms_snapshot = selected_platforms ? selected_platforms : [];
    },[selected_platforms]);

    useEffect(() => {
        if(mode === "edit" && categories.length > 0 && bot) {
            let populated_categories = [];
            let find_category;
            for(let i in bot.categories) {
                find_category = categories.find(category => category._id === bot.categories[i]._id)
                if(find_category) {
                    populated_categories.push(find_category)
                }
            }
            setValue("categories",populated_categories)
        }
    },[categories, bot]);
    
    useEffect(() => {
        if(mode === "edit" && platforms.length > 0 && bot) {
            let populated_platforms = [];
            let find_platform;
            for(let i in bot.platforms) {
                find_platform = platforms.find(platforms => platforms._id === bot.platforms[i]._id)
                if(find_platform) {
                    populated_platforms.push(find_platform)
                }
            }
            setValue("platforms",populated_platforms)
        }
    },[platforms, bot]);

    // methods and services

    const findUrl = (service) => {
        let find_url = bot.links.find(link => link.service === service)
        if(find_url) {
            return find_url.url
        }
        return '';
    }

    const handleGetPlatforms = async () => {
        const [error, response] = await getPlatforms();
        if(error) {
            return;
        }
        setPlatforms(response.data);
    }

    const handleGetCategories = async () => {
        const [error, response] = await getCategories();
        if(error) {
            return;
        }
        setCategories(response.data);
    }

    const handleFindBotById = async (id) => {
        const [error, response] = await findBotById(id);
        if(error) {
            return;
        }
        setLoading(false);
        setBot(response.data);
        setValue("name",response.data.name);
        setValue("tagline",response.data.tagline);
        setValue("website",response.data.website);
        setValue("twitter",response.data.twitter);
        setValue("facebook",response.data.facebook);
        setValue("about",response.data.about);
        setValue("tags",response.data.tags);
        setValue("profile",response.data.company ? response.data.company._id : "personal");        
    }
    
    const onSubmit = async (form) => {
        setSubmitting(true);
        setErrorVisibile(false);

        if(form.profile !== "personal") {
            form.company = form.profile
            delete form.profile;
        } else {
            delete form.profile;
        }

        let payload = {
            ...form,
            categories: form.categories.map(category => category._id),
            platforms: form.platforms.map(platform => platform._id),
        }

        let error, response;
        if(mode === "new") {
            [error, response] = await createBot(app.token, payload);
        } else {
            [error, response] = await updateBot(app.token, payload, bot._id);
        }
        setSubmitting(false);
        if(error) {
            const errors_ = parseErrors(error.response);
            setUiError(errors_);
            setErrorVisibile(true);
            return;
        }
        enqueueSnackbar(mode === 'new' ? 'Success! Your new bot has been added.' : 'Success! Your bot has been updated.', { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        if(mode === 'new') {
            history.push('/settings/bots/' + response.data._id);
        }
    }

    const posterUploaded = (response) => {
        enqueueSnackbar("Success! Your bot's poster has been uploaded.", { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setBot(prevBot => ({...prevBot, poster: response.poster}));
    }

    const logoUploaded = (response) => {
        enqueueSnackbar("Success! Your bot's logo has been uploaded.", { 
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            }
        });
        setBot(prevBot => ({...prevBot, logo: response.logo}));
    }
    const findValidationPattern = (service) => {
        let find_pattern = patterns.find(pattern => pattern.service === service);
        return find_pattern
    }
    
    const handleDeleteBot = async() => {
        let confirmation = window.confirm("Are you sure?");
        if(confirmation) {
            setSubmitting(true);
            const [error, response] = await deleteBot(app.token,match.params.id);
            setSubmitting(false);
            if(error) {
                const api_errors = parseErrors(error.response);
                setUiError(api_errors);
                setErrorVisibile(true);
                return;
            }
            enqueueSnackbar("Success! This bot has been deleted.", { 
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
            history.push('/settings/bots');
        }
    }

    if(loading) {
        return (
            <LinearProgress color="secondary"/>
        )
    }

    return (
        <Fragment>
            {
                is_error_visible ? <Error error={error} /> : null
            }
            {
                (mode === "edit" && bot) && (
                    <Fragment>
                        <Typography 
                            variant="subtitle1"
                            className="mb-2"
                        >
                            Logo
                        </Typography>
                        <div className="d-flex mb-4 align-items-center">
                            <div className="mr-3">
                                <Avatar 
                                    bot={bot} 
                                    size={100}
                                />
                            </div>
                            <Uploader
                                url={`bots/${match.params.id}/upload`}
                                callback={logoUploaded}
                                aspectRatio={1}
                                destination="logo"
                            />
                        </div>
                        <Typography 
                            variant="subtitle1"
                            className="mb-2"
                        >
                            Poster
                        </Typography>
                        <Poster src={bot.poster}>
                            <Uploader
                                url={`bots/${match.params.id}/upload`}
                                callback={posterUploaded}
                                aspectRatio={16 / 9}
                                destination="poster"
                            />
                        </Poster>
                    </Fragment>
                )
            }

            <Typography 
                variant="subtitle1"
                className="mb-2"
            >
                Information
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <Controller
                    as={
                        <TextField 
                            label="Bot Name *"
                            autoComplete="new-password"
                            fullWidth={true}
                            variant="outlined"
                            error={errors.name && true}
                            helperText={
                                errors?.name?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 30}
                            }
                        />
                    }
                    name="name"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <Controller
                    as={
                        <TextField 
                            label="Tagline *"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.tagline && true}
                            helperText={
                                errors?.tagline?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 190}
                            }
                            helperText="Describe your bot in a few words."
                        />
                    }
                    name="tagline"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <Controller
                    as={
                        <TextField 
                            label="About *"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.about && true}
                            helperText={
                                errors?.about?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 190}
                            }
                            multiline
                            rows={4}
                            helperText="Let people know what your bot is about and how to use it."
                        />
                    }
                    name="about"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <Controller
                    as={
                        <TextField 
                            label="Website *"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.website && true}
                            helperText={
                                errors?.website?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 100}
                            }
                        />
                    }
                    name="website"
                    control={control}
                    defaultValue={""}
                    rules={{ 
                        required: "This field is required." 
                    }}
                />
                <Controller
                    as={
                        <TextField 
                            label="Twitter"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.twitter && true}
                            helperText={
                                errors?.twitter?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 100}
                            }
                        />
                    }
                    name="twitter"
                    control={control}
                    defaultValue={""}
                />
                <Controller
                    as={
                        <TextField 
                            label="Facebook"
                            fullWidth={true}
                            variant="outlined"
                            autoComplete="new-password"
                            error={errors.facebook && true}
                            helperText={
                                errors?.facebook?.message
                            }
                            className="mb-3"
                            inputProps={
                                {maxLength: 100}
                            }
                        />
                    }
                    name="facebook"
                    control={control}
                    defaultValue={""}
                />
                <Selector
                    id="profile"
                    name="profile"
                    className={"mb-3"}
                    label="Publishing profile *"
                    control={control}
                    defaultValue={""}
                    variant="outlined"
                    fullWidth={true}
                    rules={{ 
                        required: "This field is required." 
                    }}
                    errors={errors}
                    hint="Please select a profile you want to publish this bot with."
                >
                    <MenuItem value="personal">Personal account @{app.user.username}</MenuItem>
                    {
                        app.user.company && (
                            <MenuItem value={app.user.company._id}>{app.user.company.name}</MenuItem>
                        )
                    }
                </Selector>

                <AutoComplete
                    control={control}
                    name="categories"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                        <span>
                            {option.name}
                        </span>
                    )}
                    multiple
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                fullWidth={true}
                                label="Category *" 
                                variant="outlined"
                                autoComplete="new-password"
                                error={errors.categories && true}
                                helperText={
                                    errors?.categories?.message ? errors?.categories?.message : "You can select up to 5 categories."
                                }
                                className="mb-3"
                            />
                        )
                    }}
                    defaultValue={[]}
                    rules={{
                        validate: (data) => {
                            if(data.length > 5) {
                                return "You can't select more than 5 categories."
                            } else if(data.length === 0) {
                                return "This field is required. Please select at least one category."
                            }
                        }
                    }}
                    
                />
                <AutoComplete
                    control={control}
                    name="tags"
                    options={[]}
                    getOptionLabel={(option) => option}
                    renderOption={(option) => (
                        <span>
                            {option}
                        </span>
                    )}
                    multiple
                    freeSolo={true}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                fullWidth={true}
                                label="Tags" 
                                variant="outlined"
                                autoComplete="new-password"
                                error={errors.tags && true}
                                helperText={
                                    errors?.tags?.message ? errors?.tags?.message : "Optional. You can enter up to 5 tags."
                                }
                                className="mb-3"
                            />
                        )
                    }}
                    defaultValue={[]}
                    rules={{
                        validate: (data) => {
                            if(data.length > 5) {
                                return "You can't enter more than 5 tags."
                            }
                            for(let i in data) {
                                if( !/^[a-z0-9]+$/.test(data[i]) ) {
                                    return "Tags must contain only letters and numbers."
                                } else if(data[i].length > 20) {
                                    return "A tag cannot be longer than 20 characters."
                                }
                            }
                        }
                    }}
                    
                />
                <AutoComplete
                    control={control}
                    name="platforms"
                    options={platforms}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                        <span>
                            <img src={option.logo} width="20" className="mr-2"/> {option.name}
                        </span>
                    )}
                    multiple
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                fullWidth={true}
                                label="Platforms *" 
                                variant="outlined"
                                autoComplete="new-password"
                                error={errors.platforms && true}
                                helperText={
                                    errors?.platforms?.message ? errors?.platforms?.message : "You can select any amount of platforms."
                                }
                                className="mb-3"
                            />
                        )
                    }}
                    defaultValue={[]}
                    rules={{
                        validate: (data) => {
                            if(data.length === 0) {
                                return "This field is required. Please select at least one platform."
                            }
                        }
                    }}
                />

                {fields.map(({ id, name, service, url }, index) => {
                    return (
                        <Fragment key={id}>
                            <input
                                ref={register()}
                                type="hidden"
                                name={`links[${index}].service`}
                                defaultValue={service}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth={true}
                                inputRef={register({
                                    required: { value: true, message: "This field is required." },
                                    pattern: findValidationPattern(service)
                                })}
                                type="text"
                                label={`${name} installation URL`}
                                name={`links[${index}].url`}
                                defaultValue={url}
                                className="mb-3"
                                error={Object.keys(errors).length > 0 && errors?.links && errors?.links[index]?.url ? true : false}
                                helperText={
                                    (Object.keys(errors).length > 0 && errors?.links && errors?.links[index]?.url) ? errors?.links[index]?.url?.message : ''
                                }
                            />
           
                        </Fragment>
                    );
                })}
                <div className="d-flex justify-content-between mb-3">
                    <Button 
                        disabled={submitting}
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        >{
                            mode === "edit" ? "Update" : "Create"
                        }
                    </Button>
                    {
                        mode === 'edit' && (
                            <Button 
                                disabled={submitting}
                                variant="outlined"
                                onClick={() => handleDeleteBot()}
                                style={{color:'#f44336'}}
                                type="button"
                                >
                                    Delete
                            </Button>
                        )
                    }
                </div>
            </form>
        </Fragment>
    )

}

export default BotForm;