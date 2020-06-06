<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white font-weight-bold">Let's Login</div>

          <div class="card-body">
            <form method="post">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email Address</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    :class="{'is-invalid':emailErr}"
                    name="email"
                    :value="email"
                    required
                    autocomplete="email"
                  />
                  <!-- Above Needs Email cookie -->
                  <span v-if="emailErr" class="invalid-feedback" role="alert">
                    <strong>{{ emailErr }}</strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    :class="{'is-invalid':pwErr}"
                    name="password"
                    required
                    autocomplete="current-password"
                  />

                  <span v-if="pwErr" class="invalid-feedback" role="alert">
                    <strong>{{ pwErr }}</strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6 offset-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      v-model="remembered"
                      type="checkbox"
                      name="remember"
                      id="remember"
                    />
                    <label class="form-check-label" for="remember">Remember Me</label>
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                  <a class="btn btn-link" href>Forgot Your Password?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailErr: null,
      pwErr: null,
      remembered: true
    };
  }
};
</script>
